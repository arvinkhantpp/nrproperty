import type { Access, FieldAccess } from 'payload'

export const ROLES = ['admin', 'editor', 'sales'] as const
export type Role = (typeof ROLES)[number]

type UserWithRole = { role?: Role | null } | null | undefined

export const hasRole = (user: UserWithRole, ...roles: Role[]): boolean =>
  Boolean(user?.role && roles.includes(user.role))

export const isAdmin: Access = ({ req }) => hasRole(req.user as UserWithRole, 'admin')
export const isAdminOrEditor: Access = ({ req }) =>
  hasRole(req.user as UserWithRole, 'admin', 'editor')
export const isLoggedIn: Access = ({ req }) => Boolean(req.user)
export const anyone: Access = () => true

export const isAdminField: FieldAccess = ({ req }) => hasRole(req.user as UserWithRole, 'admin')
