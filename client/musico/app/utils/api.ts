export const fetchSheetsList = async (userId: string) => {
    const response = await fetch(`/api/sheets?userId=${userId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch sheets');
    }
    return response.json();
};

export const uploadSheet = async (formData: FormData) => {
    const response = await fetch('/api/sheets', {
        method: 'POST',
        body: formData,
    });
    if (!response.ok) {
        throw new Error('Failed to upload sheet');
    }
    return response.json();
};

export const deleteSheet = async (sheetId: string) => {
    const response = await fetch(`/api/sheets/${sheetId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete sheet');
    }
    return response.json();
}; 