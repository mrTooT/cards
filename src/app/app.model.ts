export interface Player {
    key: string;
    name: string;
    photo: string;
    balance: number;
    isPlaying: boolean;
    shots: number;
    pokerWinnings?: number;
    boughtIn?: number;
    score?: number;
    guess?: number;
    actual?: number;
    rebuyCount?: number;
}

export interface CurrentGame {
    playing: boolean;
    playersSelected: boolean;
    lastGameStarted?: number;
    isCashgame?: boolean;
    game?: Game
}

export interface Game {
    gameType: GameType;
    currentBlindlevel?: string;
    blindLevels?: string[];
    potAmount?: number;
    rebuyCount?: number;
    round?: number;

}

export enum GameType {
    Poker = 'Poker',
    Boerenbridge = 'Boerenbrige',
    Hartenjagen = 'Hartenjagen'
}
