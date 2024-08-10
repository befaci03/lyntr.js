declare function SendMessage({ token, message, id }: {
    token: string;
    message: string;
    id: string;
}): Promise<any>;
declare function findMessages(token: string, searchTerm: string): Promise<string[]>;
declare function continuousSearch(token: string, searchTerm: string): Promise<void>;

export { SendMessage, continuousSearch, findMessages };
