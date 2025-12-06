import { CheckRequest, RotateTileRequest } from './../../../shared/src/models/Requests';
import { inject, injectable } from "tsyringe";

import { BaseResponse } from "@shared/models/Responses";
import type Board from "../modules/game/Board";
import { DeclareReadyRequest } from "@shared/models/Requests";

@injectable()
export default class GameService {

    constructor(

    ) {}

    declareReady(request: DeclareReadyRequest): BaseResponse<Board> {
        //TODO
        return { ok: true, data: undefined as unknown as Board };
    }

    rotateTile(request: RotateTileRequest): BaseResponse<Board> {
        //TODO
        return { ok: true, data: undefined as unknown as Board };
    }

    check(request: CheckRequest): BaseResponse<string[]> {
        //TODO
        return { ok: true, data: [] };
    }
}