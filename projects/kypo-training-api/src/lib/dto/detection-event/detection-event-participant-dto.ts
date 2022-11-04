export interface DetectionEventParticipantDTO {
  ip_address?: string;
  occurred_at: Date;
  participant_name: string;
  solved_in_time?: number;
  userId: number;
}
