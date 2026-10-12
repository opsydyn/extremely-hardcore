export interface Actor {
  tenantId: string;
  role: string;
}

export interface Document {
  tenantId: string;
}

export function canReadDocument(actor: Actor, document: Document): boolean {
  if (actor.role === "admin") return true;
  return actor.role === "reader"
    && actor.tenantId.trim().length > 0
    && document.tenantId.trim().length > 0
    && actor.tenantId === document.tenantId;
}
