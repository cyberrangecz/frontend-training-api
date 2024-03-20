export interface DetectedForbiddenCommandDTO {
  command: string;
  type: string;
  detection_event_id: number;
  hostname: string;
  occurred_at: Date;
}
