type EmailRow = {
    id: string;
    from_address: string;
    to_address: string;
    body: string;
    timestamp: number;
    subject: string | null;
};
export type { EmailRow };