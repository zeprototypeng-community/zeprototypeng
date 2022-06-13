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
    roleUserId: 11,
    permissionRoleId: 12,
    permissionUserId: 13
}

export const forms: Iform[] = [
    {
        id: formIds.testFormId,
        controls: [
            {
                index: 1,
                label: "NOM",
                name: "hid",
                type: InputType.HIDDEN,
                rules: [],
                containerClass: 'clr-col-6'
            },
            {
                index: 1,
                label: "NOM",
                name: "firstname",
                type: InputType.TEXT,
                rules: [
                    { rule: 'required', value: true },
                    { rule: 'minLength', value: 2 },
                ],
                containerClass: 'clr-col-6'
            },
            {
                index: 2,
                label: "Prenom",
                name: "lastname",
                rules: [],
                type: InputType.TEXT,
                containerClass: 'clr-col-3',
                patterns: [patterns.onlyNumbers],
            },
            {
                index: 2,
                label: "E-mail",
                name: "email",
                value: "d",
                rules: [],
                type: InputType.EMAIL,
                containerClass: 'clr-col-3',
                patterns: [],
            },
            {
                index: 2,
                label: "Mot de passe",
                name: 'password',
                rules: [],
                value: "s",
                type: InputType.PASSWORD,
                containerClass: 'clr-col-3',
                patterns: [],
            },
            {
                index: 2,
                label: "Sexe",
                name: "sex",
                items: [
                    { value: "M", label: "MASCULIN" },
                    { value: "F", label: "FEMININ" },
                ],
                rules: [],
                type: InputType.RADIO,
                containerClass: 'clr-col-3',
                patterns: [],
            },
            {
                index: 2,
                label: "CATEGORIE",
                name: "categorie",
                items: [
                    { value: false, label: "BEBE", name: "B" },
                    { value: false, label: "JEUNE", name: "J" },
                    { value: false, label: "ADULTE", name: "A" },
                ],
                rules: [{ rule: 'required', value: true },],
                type: InputType.CHECKBOX,
                containerClass: 'clr-col-3',
                patterns: [],
            },
            {
                index: 3,
                label: "Age",
                name: "age",
                type: 'number',
                rules: [{ rule: 'required', value: true },],
                containerClass: 'clr-col-3',
                patterns: [patterns.onlyNumbers],
            },
            {
                index: 4,
                label: "Commentaire",
                name: "comment",
                type: InputType.TEXTAREA,
                rules: [],
                containerClass: 'clr-col-12',
                patterns: [],
            },
            {
                index: 4,
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
                index: 5,
                label: "s",
                type: InputType.ARRAY,
                name: "F",
                rules: [],
                childreen: [
                    {
                        index: 1,
                        label: "rep NOM",
                        name: "nom",
                        type: InputType.TEXT,
                        rules: [ { rule: 'required', value: true },],
                        containerClass: 'clr-col-6'
                    },
                    {
                        index: 2,
                        label: "rep pren",
                        name: "pren",
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
                label: "Libelle",
                name: "label",
                type: InputType.TEXT,
                rules: [
                    { rule: 'required', value: true },
                ],
                containerClass: 'clr-col-3'
            },
            {
                index: 2,
                label: "Libelle affiché",
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
            },
            {
                index: 4,
                label: "withDestroyRelationModel",
                name: "withDestroyRelationModel",
                rules: [],
                value: true,
                type: InputType.HIDDEN
            }
        ]
    },
    {
        id: formIds.permissionFormId,
        controls: [
            {
                index: 1,
                label: "Libelle",
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
                label: "Nom",
                name: "lastname",
                type: InputType.TEXT,
                rules: [],
                containerClass: 'clr-col-3'
            },
            {
                index: 2,
                label: "Prénom",
                name: "firstname",
                type: InputType.TEXT,
                rules: [],
                containerClass: 'clr-col-3'
            },
            {
                index: 3,
                label: "Nom d'utilisateur",
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
                label: "Mot de passe",
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
                label: "Utilisateur",
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
                label: "Rôle",
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
                label: "Rôle",
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
                label: "Utilisateur",
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