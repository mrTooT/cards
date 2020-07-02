import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {CurrentGame, GameType, Player} from '../app.model';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import {ActionSheetController, IonReorderGroup} from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'games.page.html',
  styleUrls: ['games.page.scss']
})
export class GamesPage implements OnInit{
  currentGame: CurrentGame;
  gameType = GameType;
  gameRef: AngularFireObject<any>;
  namesRef: AngularFireList<any>;
  isPlaying = false;
  namesSelected = false;
  selectedGame: GameType;
  constructor(db: AngularFireDatabase, public actionSheetController: ActionSheetController) {
    this.gameRef = db.object<CurrentGame>('current');
    this.namesRef = db.list<string[]>('names');
  }

  public ngOnInit() {
    this.gameRef.snapshotChanges().subscribe((game) => {
          this.currentGame = game.payload.val();
          this.isPlaying = this.currentGame.playing;
          this.namesSelected = this.currentGame.namesSelected;
          console.log(this.currentGame);
        }
      );
  }
  public onCloseGame() {
      this.presentActionSheet();
  }

  public startGame() {
      this.isPlaying = true;
      this.gameRef.set({
          playing: true,
          namesSelected: false,
          blindLevel: 0,
          playerSelected: false,
          gameStarted: false
      });
  }

  public onNamesSelected() {
      this.gameRef.set({
          playing: true,
          namesSelected: true,
          blindLevel: 0,
          playerSelected: false,
          gameStarted: false
      });
  }

    async presentActionSheet() {
        const actionSheet = await this.actionSheetController.create({
            header: 'Are you fo sho?',
            buttons: [{
                text: 'Stop playing',
                role: 'destructive',
                icon: 'trash',
                handler: () => {
                    console.log('I am called');
                    this.isPlaying = false;
                    const newGame: CurrentGame = {
                        playing: false,
                        namesSelected: false,
                        blindLevel: 0,
                        playerSelected: false,
                        gameStarted: false
                    };
                    this.gameRef.set(newGame);
                }
            }, {
                text: 'Hellz No',
                icon: 'close',
                handler: () => {
                    console.log('Share clicked');
                }
            }]
        });
        await actionSheet.present();
    }
}
