import type { CollectionConfig } from 'payload'

export const MovieApprovals: CollectionConfig = {
  slug: 'movie-approvals',
  access: {
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'editor',
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  hooks: {
    beforeChange: [
      ({ data, req, operation }) => {
        if (operation !== 'create') return data

        return {
          ...data,
          submittedBy: req.user?.id,
          // Editors always submit as pending (and never choose status)
          status: req.user?.role === 'editor' ? 'pending' : (data?.status ?? 'pending'),
        }
      },
    ],
    afterChange: [
      async ({ doc, previousDoc, req, operation, context }) => {
        if (operation !== 'update') return
        if (context?.fromApprovalHook) return

        const wasApproved = previousDoc?.status === 'approved'
        const isApproved = doc?.status === 'approved'

        // Only create once when transitioning to approved
        if (!wasApproved && isApproved && !doc?.movie) {
          const created = await req.payload.create({
            collection: 'movies',
            data: doc.movieData,
            req,
          })

          await req.payload.update({
            collection: 'movie-approvals',
            id: doc.id,
            data: { movie: created.id },
            req,
          })
        }
      },
    ],
  },
  fields: [
    {
      name: 'movieData',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'releaseDate', type: 'date' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'Changes Required', value: 'changes_required' },
      ],
      defaultValue: 'pending',
      admin: {
        condition: (_data, _siblingData, { user }) => user?.role === 'admin',
      },
    },
    {
      name: 'comment',
      type: 'textarea',
      admin: {
        // Hide on create for editors; allow viewing later (and admins always see it)
        condition: (data, _siblingData, { user }) =>
          user?.role === 'admin' || (user?.role === 'editor' && Boolean(data?.id)),
      },
    },
    {
      name: 'submittedBy',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'movie',
      type: 'relationship',
      relationTo: 'movies',
      admin: {
        hidden: true,
      },
    },
  ],
}
