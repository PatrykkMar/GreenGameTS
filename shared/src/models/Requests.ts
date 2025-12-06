export interface CreateLobbyRequest {
    lobbyId: string;
    nick: string;
}

export interface JoinLobbyRequest {
    lobbyId: string;
    nick: string;
}

export interface LeaveLobbyRequest {
}

export interface SendMsgRequest {
    lobbyId: string;
    author: string;
    text: string;
}

export interface GetMessagesRequest {

}

export interface GetUserListRequest {

}

export interface DeclareReadyRequest {

}

export interface RotateTileRequest {
    tileId: number
}

export interface CheckRequest {
    inputs: string[]
}