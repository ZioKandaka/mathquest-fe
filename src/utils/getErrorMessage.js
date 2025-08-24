import { isAxiosError } from 'axios';

export default function getErrorMessage(err) {
    if (!err) return 'Unknown error';
    if (isAxiosError(err)) {
        return (
            err.response?.data?.message ||
            err.response?.data?.error ||
            err.message
        );
    }
    if (err.name === 'CanceledError') return 'Request canceled';
    if (err instanceof Error) return err.message;
    try { return JSON.stringify(err); } catch { return String(err); }
}
