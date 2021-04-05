export enum RolesEnum {
  VIEW_ONLY,
  CONTRIBUTOR,
  ADMIN,
  OWNER,
}

export type GateWayStringsType = keyof typeof RolesEnum;
