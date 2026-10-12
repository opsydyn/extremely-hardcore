export interface Actor { tenantId:string; role:string; }
export interface Document { tenantId:string; }
export function canReadDocument(a:Actor,d:Document):boolean { return a.tenantId.trim().length > 0 && d.tenantId.trim().length > 0 && a.tenantId === d.tenantId; }