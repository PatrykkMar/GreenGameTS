export interface CreateLobbyRequest {
    id: string;
    nick: string;
}

export interface JoinLobbyRequest {
    id: string;
    nick: string;
}

export interface LeaveLobbyRequest {
    id: string;
}

export interface SendMsgRequest {
    lobbyId: string;
    author: string;
    text: string;
}

export interface GetMessagesRequest {
    id: string;
}

export interface GetUserListRequest {
    id: string;
}