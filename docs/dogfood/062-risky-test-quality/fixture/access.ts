export interface Actor {
  tenantId: string;
  role: string;
}

export interface Document {
  tenantId: string;
}

export function canReadDocument(actor: Actor, document: Document): boolean {
  return (actor.role === "reader" || actor.role === "admin")
    && actor.tenantId.trim().length > 0
    && document.tenantId.trim().length > 0
    && actor.tenantId === document.tenantId;
}
