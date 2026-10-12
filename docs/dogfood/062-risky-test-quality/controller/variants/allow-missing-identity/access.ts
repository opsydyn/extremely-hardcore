export interface Actor { tenantId:string; role:string; }
export interface Document { tenantId:string; }
export function canReadDocument(a:Actor,d:Document):boolean { return (a.role === "reader" || a.role === "admin") && a.tenantId === d.tenantId; }