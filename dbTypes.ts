type EmailRow = {
    id: string;
    from_address: string | null;
    from_name: string | null;
    to_address: string;
    body: string;
    timestamp: number;
    subject: string | null;
};
export type { EmailRow };