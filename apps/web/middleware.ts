export {default} from 'next-auth/middleware'

export const config = { matcher: [
    "/manage","/upload","/admin",
    "/admin/profile",
] }

