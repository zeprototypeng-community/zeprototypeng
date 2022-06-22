import { Iform, InputType } from "src/app/core/form-module/dynamic-form/dynamic-form.component";
import { apiRoutes } from "../routing/api-routes";

export const patterns = {
    onlyNumbers: /^-?(0|[1-9]\d*)?$/,
    // write your patterns here
};

export const formIds = {
    testFormId: 0,
    roleFormId: 1,
    permissionFormId: 2,
    userFormId: 3,
    roleUserId: 4,
    permissionRoleId: 5,
    permissionUserId: 6,
}

export const forms: Iform[] = [
    {
        id: formIds.testFormId,
        controls: [
            {
                label: "Name",
                name: "hid",
                type: InputType.HIDDEN,
                rules: [],
                containerClass: 'clr-col-6'
            },
            {
                label: "Firstname",
                name: "firstname",
                type: InputType.TEXT,
                rules: [
                    { rule: 'required', value: true },
                    { rule: 'minLength', value: 2 },
                ],
                containerClass: 'clr-col-6'
            },
            {
                label: "lastname",
                name: "lastname",
                rules: [],
                type: InputType.TEXT,
                containerClass: 'clr-col-3',
                patterns: [patterns.onlyNumbers],
            },
            {
                label: "E-mail",
                name: "email",
                value: "d",
                rules: [],
                type: InputType.EMAIL,
                containerClass: 'clr-col-3',
                patterns: [],
            },
            {
                label: "Password",
                name: 'password',
                rules: [],
                value: "s",
                type: InputType.PASSWORD,
                containerClass: 'clr-col-3',
                patterns: [],
            },
            {
                label: "Sex",
                name: "sex",
                items: [
                    { value: "M", label: "MALE" },
                    { value: "F", label: "FEMALE" },
                ],
                rules: [],
                type: InputType.RADIO,
                containerClass: 'clr-col-3',
                patterns: [],
            },
            {
                label: "CATEGORY",
                name: "category",
                items: [
                    { value: false, label: "BABY", name: "B" },
                    { value: false, label: "YOUNG", name: "Y" },
                    { value: false, label: "ODL", name: "O" },
                ],
                rules: [{ rule: 'required', value: true },],
                type: InputType.CHECKBOX,
                containerClass: 'clr-col-3',
                patterns: [],
            },
            {
                label: "Age",
                name: "age",
                type: 'number',
                rules: [{ rule: 'required', value: true },],
                containerClass: 'clr-col-3',
                patterns: [patterns.onlyNumbers],
            },
            {
                label: "Comment",
                name: "comment",
                type: InputType.TEXTAREA,
                rules: [],
                containerClass: 'clr-col-12',
                patterns: [],
            },
            {
                label: "DATE",
                name: "date",
                type: InputType.DATE,
                rules: [
                    { rule: 'required', value: true },
                ],
                containerClass: 'clr-col-3',
                patterns: [],
            },
            {
                label: "Permission",
                name: "permission_id",
                rules: [
                    { rule: 'required', value: true },
                ],
                type: InputType.SELECT,
                remote: { url: apiRoutes.permissions, fields: { label: 'label', value: 'id' } },
                containerClass: 'clr-col-3',
                multiple: true
            },
            {
                label: "s",
                type: InputType.ARRAY,
                name: "F",
                rules: [],
                childreen: [
                    {
                        index: 1,
                        label: "input 1",
                        name: "inputone",
                        type: InputType.TEXT,
                        rules: [ { rule: 'required', value: true },],
                        containerClass: 'clr-col-6'
                    },
                    {
                        index: 2,
                        label: "input 2",
                        name: "inputtwo",
                        type: InputType.TEXT,
                        rules: [],
                        containerClass: 'clr-col-6'
                    },
                ]
            }
        ]
    },
    {
        id: formIds.roleFormId,
        controls: [
            {
                index: 1,
                label: "Label",
                name: "label",
                type: InputType.TEXT,
                rules: [
                    { rule: 'required', value: true },
                ],
                containerClass: 'clr-col-3'
            },
            {
                index: 2,
                label: "Display label",
                name: "display_label",
                rules: [
                    { rule: 'required', value: true },
                ],
                type: InputType.TEXT,
                containerClass: 'clr-col-3',
            },
            {
                index: 3,
                label: "Permission",
                name: "permission_id",
                rules: [
                    { rule: 'required', value: true },
                ],
                type: InputType.SELECT,
                remote: { url: apiRoutes.permissions, fields: { label: 'label', value: 'id' } },
                containerClass: 'clr-col-3',
                multiple: true
            }
        ]
    },
    {
        id: formIds.permissionFormId,
        controls: [
            {
                index: 1,
                label: "Label",
                name: "label",
                type: InputType.TEXT,
                rules: [
                    { rule: 'required', value: true },
                ],
                containerClass: 'clr-col-3'
            },
            {
                index: 2,
                label: "Description",
                name: "display_label",
                rules: [
                    { rule: 'required', value: true },
                ],
                type: InputType.TEXT,
                containerClass: 'clr-col-3',
            },
        ]
    },
    {
        id: formIds.userFormId,
        controls: [
            {
                index: 1,
                label: "Lastname",
                name: "lastname",
                type: InputType.TEXT,
                rules: [],
                containerClass: 'clr-col-3'
            },
            {
                index: 2,
                label: "Firstname",
                name: "firstname",
                type: InputType.TEXT,
                rules: [],
                containerClass: 'clr-col-3'
            },
            {
                index: 3,
                label: "Username",
                name: "username",
                rules: [
                    { rule: 'required', value: true },
                ],
                type: InputType.TEXT,
                containerClass: 'clr-col-3',
            },
            {
                index: 4,
                label: "Email",
                name: "email",
                rules: [
                    { rule: 'required', value: true },
                    { rule: 'email', value: true }
                ],
                type: InputType.EMAIL,
                containerClass: 'clr-col-3',
            },
            {
                index: 5,
                label: "Password",
                name: "password",
                rules: [
                    { rule: 'required', value: true },
                    { rule: 'minLenght', value: 6 }
                ],
                type: InputType.PASSWORD,
                containerClass: 'clr-col-3',
            },
            {
                index: 6,
                label: "Confirmation",
                name: "password_confirmation",
                rules: [
                    { rule: 'required', value: true },
                    { rule: 'minLenght', value: 6 },
                ],
                type: InputType.PASSWORD,
                containerClass: 'clr-col-3',
            },
        ]
    },
    {
        id: formIds.roleUserId,
        controls: [
            {
                index: 1,
                label: "User",
                name: "user_id",
                type: InputType.SELECT,
                rules: [
                    { rule: 'required', value: true },
                ],
                remote: { url: apiRoutes.users, fields: { label: 'username', value: 'id' } },
                containerClass: 'clr-col-3'
            },
            {
                index: 2,
                label: "Role",
                name: "role_id",
                rules: [
                    { rule: 'required', value: true },
                ],
                type: InputType.SELECT,
                remote: { url: apiRoutes.roles, fields: { label: 'label', value: 'id' } },
                containerClass: 'clr-col-3',
            },
        ]
    },
    {
        id: formIds.permissionRoleId,
        controls: [
            {
                index: 1,
                label: "Role",
                name: "role_id",
                type: InputType.SELECT,
                rules: [
                    { rule: 'required', value: true },
                ],
                remote: { url: apiRoutes.roles, fields: { label: 'label', value: 'id' } },
                containerClass: 'clr-col-3'
            },
            {
                index: 2,
                label: "Permission",
                name: "permission_id",
                rules: [
                    { rule: 'required', value: true },
                ],
                type: InputType.SELECT,
                remote: { url: apiRoutes.permissions, fields: { label: 'label', value: 'id' } },
                containerClass: 'clr-col-3',
                multiple: true
            },
        ]
    },
    {
        id: formIds.permissionUserId,
        controls: [
            {
                index: 1,
                label: "User",
                name: "user_id",
                type: InputType.SELECT,
                rules: [
                    { rule: 'required', value: true },
                ],
                remote: { url: apiRoutes.users, fields: { label: 'username', value: 'id' } },
                containerClass: 'clr-col-3'
            },
            {
                index: 2,
                label: "Permission",
                name: "permission_id",
                rules: [
                    { rule: 'required', value: true },
                ],
                type: InputType.SELECT,
                remote: { url: apiRoutes.permissions, fields: { label: 'label', value: 'id' } },
                containerClass: 'clr-col-3',
            },
        ]
    }
];