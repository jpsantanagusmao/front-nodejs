export interface RoleModel {
    id: string;
    description: string;
    class: number;
    type: string;
    createdby: string;
    updatedby?: string;
    created: Date;
    updated?: string;
}
