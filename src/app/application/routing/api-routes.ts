import { environment } from "src/environments/environment";

export const minRoutes = {
    users: 'user',
    roles: 'role',
    permissions: 'permission',
    permissions_role: 'permission_role',
    permissions_user: 'permission_user',
    roles_user: 'role_user'
};

export const apiRoutes = {
    users: environment.APP_SERVER_HOST + environment.URLPART1 + minRoutes.users,
    roles: environment.APP_SERVER_HOST + environment.URLPART1 + minRoutes.roles,
    permissions: environment.APP_SERVER_HOST + environment.URLPART1 + minRoutes.permissions,
    permissions_role: environment.APP_SERVER_HOST + environment.URLPART1 + minRoutes.permissions_role,
    permissions_user: environment.APP_SERVER_HOST + environment.URLPART1 + minRoutes.permissions_user,
    roles_user: environment.APP_SERVER_HOST + environment.URLPART1 + minRoutes.roles_user
};