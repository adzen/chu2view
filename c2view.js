let baseURL = "https://chunithm-net-eng.com/";
let title = "chu2viewer";
let chu2viewHTML = `
  



    <div id=\"app\">
    <v-app>
      <!--<v-overlay :value=\"overlay\">
      <v-progress-circular
        indeterminate
        size=\"64\"
      ></v-progress-circular>
      </v-overlay>-->

      <v-dialog v-model=\"chu2dialog\" fullscreen transition=\"dialog-bottom-transition\">
      <v-card>
        <v-toolbar flat color=\"green\" dark>
        <v-toolbar-title>chu2 viewer</v-toolbar-title>
        <!-- 
               <v-btn icon dark
              @click=\"closeChu2()\" >
              <v-icon>mdi-close</v-icon>
            </v-btn>-->        
        <template v-slot:extension>
        <v-tabs icons-and-text fixed-tabs v-model=\"tab\" slider-color=\"brown\">
          <!--<v-tab disabled>Player<v-icon>mdi-face</v-icon></v-tab>-->
          <v-tab>Recent<v-icon>mdi-calendar</v-icon></v-tab>
          <v-tab>Score<v-icon>mdi-chart-bar</v-icon></v-tab>
          <!--<v-tab disabled>Song<v-icon>mdi-music-note</v-icon></v-tab>-->
        </v-tabs>
        </template>
        </v-toolbar>

        <v-tabs-items v-model=\"tab\">
        <!-------- Player -------->
        <!--<v-tab-item>
        <v-card flat>
        <v-card-text>(Currently without anything)</v-card-text>     
               document.getElementsByClassName(\"player_name\")[0].innerText;
               document.getElementsByClassName(\"player_name2\")[0].innerText;
              document.getElementsByClassName(\"player_rating\")[0].innerText;

              document.getElementsByClassName(\"user_data_play\")[0].innerText;
              document.getElementsByClassName(\"user_data_playpoint\")[0].innerText;
              -->
        <!--</v-card>
        </v-tab-item>-->

        <!-------- Recent -------->
        <v-tab-item>
        <v-card flat>
        <v-card-text>
        <v-btn @click=\"getRecentScores()\">Read Recent Scores</v-btn>
        
        <v-expansion-panels>
          <v-expansion-panel>
          <v-expansion-panel-header>Columns & Filters</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>Columns: 
              <v-btn-toggle v-model=\"recentCols\" multiple >
              <v-btn v-for=\"c in recentAvaialeCols\" :key=\"c\"  v-text=\"c\"></v-btn> 
              </v-btn-toggle> 
            </v-row>    
            <v-row>Diff:
              <v-btn-toggle v-model=\"filterDiffs\" multiple>
              <v-btn v-for=\"d in allDiff\" :key=\"d\" v-text=\"d\"></v-btn> 
              </v-btn-toggle>
            </v-row>
            <v-row>Ranks:
              <v-btn-toggle v-model=\"filterRanks\" multiple>
              <v-btn v-for=\"r in filterableRanks\" :key=\"r\" v-text=\"r\"></v-btn>
              </v-btn-toggle>
            </v-row>
            <v-row>Genres:
              <v-btn-toggle v-model=\"filterGenres\" multiple>
              <v-btn v-for=\"g in genre\" :key=\"g\" v-text=\"g\"></v-btn> 
              </v-btn-toggle>
            </v-row>
            <v-row>Outer:
              <v-btn-toggle v-model=\"filterOuters\" multiple>
              <v-btn v-for=\"o in filterableOuter\" :key=\"o\" v-text=\"o\"></v-btn>
              </v-btn-toggle>
            </v-row>
          </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <v-data-table
        :headers=\"recentheaders\"
        :items=\"recent\"
        :items-per-page=\"-1\"
        multi-sort  
        >
          <template v-slot:item.title=\"{ item }\">
            <v-avatar tile><img :src=\"item.cover\"></v-avatar>
            {{ item.title }}
          </template>
          <!-- <template v-slot:header.miss=\"{ header }\">
          {{ header.miss }} <v-icon>mdi-music-note</v-icon>
          </template>-->
          <template v-slot:item.diff=\"{ item }\">
            <div :style=\"diffColor(item.diff)\">
            {{ item.diff }}
            </div>
          </template>
          <template v-slot:item.rating=\"{ item }\">
            <div :style=\"ratingColor(item.rating)\">
            {{ item.rating }}
            </div>
          </template>
        </v-data-table>
        </v-card-text>
        </v-card>
        </v-tab-item>
   
        <!-------- Score -------->
        <v-tab-item>
        <v-card flat>
        <v-card-text>    
        <v-btn @click=\"getBestScores()\">Read Best Scores</v-btn>
        <v-alert border=\"left\" dense colored-border type=\"info\" elevation=\"2\">
        played maps = <b>{{ playedMap }}</b>;
        best 30: <b>{{ lastBestRate }} ~ {{ maxBestRating }}</b>, average = <b>{{ averageOfBest.toFixed(5) }}</b>; possible maximum rating = <b>{{ maximumPossibleRate.toFixed(5) }}</b>
        </v-alert>

        <v-expansion-panels>
          <v-expansion-panel>
          <v-expansion-panel-header>Columns & Filters</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>Columns: 
              <v-btn-toggle v-model=\"bestCols\" multiple >
              <v-btn v-for=\"c in bestAvaialeCols\" :key=\"c\"  v-text=\"c\"></v-btn> 
              </v-btn-toggle> 
            </v-row>         
            <v-row>Diff:
              <v-btn-toggle v-model=\"filterDiffs\" multiple >
              <v-btn v-for=\"d in allDiff\" :key=\"d\"  v-text=\"d\"></v-btn> 
              </v-btn-toggle>
            </v-row>
            <v-row>Ranks:
              <v-btn-toggle v-model=\"filterRanks\" multiple>
              <v-btn v-for=\"r in filterableRanks\"  :key=\"r\" v-text=\"r\"></v-btn>
              </v-btn-toggle>
            </v-row>
            <v-row>Genres:
              <v-btn-toggle v-model=\"filterGenres\" multiple >
              <v-btn v-for=\"g in genre\" :key=\"g\"  v-text=\"g\"></v-btn> 
              </v-btn-toggle>
            </v-row>
            <v-row>Outer:
              <v-btn-toggle v-model=\"filterOuters\" multiple>
              <v-btn v-for=\"o in filterableOuter\"  :key=\"o\" v-text=\"o\"></v-btn>
              </v-btn-toggle>
            </v-row>
          </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <v-data-table
        :headers=\"bestheaders\"
        :items=\"mybest\"
        :items-per-page=\"-1\"
        multi-sort    
        >
          <template v-slot:item.diff=\"{ item }\">
            <div :style=\"diffColor(item.diff)\">
            {{ item.diff }}
            </div>
          </template>

          <template v-slot:item.rating=\"{ item }\">
            <div :style=\"ratingColor(item.rating)\">
            {{ item.rating }}
            </div>
          </template>
        </v-data-table>
        </v-card-text>
        </v-card>
        </v-tab-item>

        <!-------- SONG -------->
        <!--<v-tab-item>
        <v-card flat>
        <v-card-text>
        (note count, distribution, rank statistic (lazy load), recommendation, link to wiki, youtube, sdvx.in etc.)
        </v-card-text>
        </v-card>
        </v-tab-item>-->
        </v-tabs-items>
        <!--<v-snackbar 
        v-model=\"snackbar\"
        timeout=\"3000\"
        >{{ snacktext }}
        </v-snackbar>-->
      </v-card>
      </v-dialog>
    </v-app>
  </div>
    

`;


////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////


let chu2_javascript = `

    
  new Vue({
      el: '#app',
      vuetify: new Vuetify(),

      data: ({
        chu2dialog: true,
        tab: null,
        //overlay: false,
        //snackbar: false,
        //snacktext: \"\",

        playedMap: 0,
        lastBestRate: 0,
        maxBestRating: 0,
        averageOfBest: 0,
        maximumPossibleRate: 0,
          
        recent: [
        /*{
            lamps: 'clear',
              critical: 768, justice: 136,  attack: 26,miss: 15,
              maxCombo: 204,
              tap: '96.42%',  hold: '96.42%',  slide: '96.42%', air: '96.42%', flick: '96.42%',
              nextRank: 446,
        },*/
        ],
        mybest: [],

        filterRanks: [],
        filterGenres: [],
        filterOuters: [],
        filterDiffs: [],

        filterableRanks: ['D', 'C', 'B', 'BB', 'BBB', 
          'A', 'AA', 'AAA', 'S', 'SS', 'SS+', 'SSS'],
        filterableOuter: ['1', '2', '3', '4', '5', '6', 
          '7', '7+', '8', '8+', '9', '9+', '10', '10+', 
          '11', '11+', '12', '12+', '13', '13+', '14'],
        genre: [\"POPS & ANIME\", \"niconico\", \"東方Project\", 
          \"VARIETY\", \"イロドリミドリ\", \"ゲキマイ\", \"ORIGINAL\"],
        allDiff: ['BASIC', 'ADVANCED', 'EXPERT', 'MASTER'],

        recentCols: [],
        recentAvaialeCols: ['title', 'diff', 'outer', 'score', 'rank', 'genre',
          'rating', 'internal', 'track', 'when'],
        bestCols: [],
        bestAvaialeCols: ['title', 'diff', 'outer', 'score', 'rank', 'genre', 
          'rating', 'internal', 'goal', 'best30'],

        music_genre: [
          {title: \"▲MEW▲△MEW△CAKE\", genre: \"POPS & ANIME\"},
          {title: \"前前前世\", genre: \"POPS & ANIME\"},
          {title: \"God knows...\", genre: \"POPS & ANIME\"},
          {title: \"五等分の気持ち\", genre: \"POPS & ANIME\"},
          {title: \"ただ君に晴れ\", genre: \"POPS & ANIME\"},
          {title: \"ゴーゴー幽霊船\", genre: \"POPS & ANIME\"},
          {title: \"ようこそジャパリパークへ\", genre: \"POPS & ANIME\"},
          {title: \"ラブリー☆えんじぇる!!\", genre: \"POPS & ANIME\"},
          {title: \"シュガーソングとビターステップ\", genre: \"POPS & ANIME\"},
          {title: \"深海少女\", genre: \"niconico\"},
          {title: \"害虫\", genre: \"niconico\"},
          {title: \"ゴーストルール\", genre: \"niconico\"},
          {title: \"StargazeR\", genre: \"niconico\"},
          {title: \"DAYBREAK FRONTLINE\", genre: \"niconico\"},
          {title: \"バレリーコ\", genre: \"niconico\"},
          {title: \"ワールズエンド・ダンスホール\", genre: \"niconico\"},
          {title: \"ヒビカセ\", genre: \"niconico\"},
          {title: \"白い雪のプリンセスは\", genre: \"niconico\"},
          {title: \"イカサマライフゲイム\", genre: \"niconico\"},
          {title: \"一触即発☆禅ガール\", genre: \"niconico\"},
          {title: \"命に嫌われている\", genre: \"niconico\"},
          {title: \"乙女解剖\", genre: \"niconico\"},
          {title: \"フィクサー\", genre: \"niconico\"},
          {title: \"ダブルラリアット\", genre: \"niconico\"},
          {title: \"アマツキツネ\", genre: \"niconico\"},
          {title: \"桜ノ雨\", genre: \"niconico\"},
          {title: \"リモコン\", genre: \"niconico\"},
          {title: \"カミサマネジマキ\", genre: \"niconico\"},
          {title: \"初音ミクの消失\", genre: \"niconico\"},
          {title: \"みくみくにしてあげる♪【してやんよ】\", genre: \"niconico\"},
          {title: \"愛言葉\", genre: \"niconico\"},
          {title: \"ビバハピ\", genre: \"niconico\"},
          {title: \"Hand in Hand\", genre: \"niconico\"},
          {title: \"ODDS&ENDS\", genre: \"niconico\"},
          {title: \"ユクエシレズ\", genre: \"niconico\"},
          {title: \"ぼくらの16bit戦争\", genre: \"niconico\"},
          {title: \"すろぉもぉしょん\", genre: \"niconico\"},
          {title: \"裏表ラバーズ\", genre: \"niconico\"},
          {title: \"ネトゲ廃人シュプレヒコール\", genre: \"niconico\"},
          {title: \"おねがいダーリン\", genre: \"niconico\"},
          {title: \"カゲロウデイズ\", genre: \"niconico\"},
          {title: \"ロキ\", genre: \"niconico\"},
          {title: \"放課後ストライド\", genre: \"niconico\"},
          {title: \"アンノウン・マザーグース\", genre: \"niconico\"},
          {title: \"いーあるふぁんくらぶ\", genre: \"niconico\"},
          {title: \"ウミユリ海底譚\", genre: \"niconico\"},
          {title: \"アスノヨゾラ哨戒班\", genre: \"niconico\"},
          {title: \"天樂\", genre: \"niconico\"},
          {title: \"Crazy ∞ nighT\", genre: \"niconico\"},
          {title: \"脳漿炸裂ガール\", genre: \"niconico\"},
          {title: \"FREELY TOMORROW\", genre: \"niconico\"},
          {title: \"ギガンティックO.T.N\", genre: \"niconico\"},
          {title: \"シリョクケンサ\", genre: \"niconico\"},
          {title: \"セツナトリップ\", genre: \"niconico\"},
          {title: \"六兆年と一夜物語\", genre: \"niconico\"},
          {title: \"Sweet Devil\", genre: \"niconico\"},
          {title: \"天ノ弱\", genre: \"niconico\"},
          {title: \"ストリーミングハート\", genre: \"niconico\"},
          {title: \"腐れ外道とチョコレゐト\", genre: \"niconico\"},
          {title: \"M.S.S.Planet\", genre: \"niconico\"},
          {title: \"タイガーランペイジ\", genre: \"niconico\"},
          {title: \"ロストワンの号哭\", genre: \"niconico\"},
          {title: \"橙の幻想郷音頭\", genre: \"東方Project\"},
          {title: \"蒼空に舞え、墨染の桜\", genre: \"東方Project\"},
          {title: \"少女幻葬戦慄曲　～　Necro Fantasia\", genre: \"東方Project\"},
          {title: \"星色夜空\", genre: \"東方Project\"},
          {title: \"物凄い勢いでけーねが物凄いうた\", genre: \"東方Project\"},
          {title: \"きゅうりバーにダイブ\", genre: \"東方Project\"},
          {title: \"色は匂へど散りぬるを\", genre: \"東方Project\"},
          {title: \"LOVE EAST\", genre: \"東方Project\"},
          {title: \"チルノおかんのさいきょう☆バイブスごはん\", genre: \"東方Project\"},
          {title: \"Floating Darkness\", genre: \"東方Project\"},
          {title: \"Bad Apple!! feat.nomico (Nhato Remix)\", genre: \"東方Project\"},
          {title: \"進捗どうですか？\", genre: \"東方Project\"},
          {title: \"お嫁にしなさいっ！\", genre: \"東方Project\"},
          {title: \"サドマミホリック\", genre: \"東方Project\"},
          {title: \"Spring of Dreams\", genre: \"東方Project\"},
          {title: \"Witches night\", genre: \"東方Project\"},
          {title: \"Calamity Fortune\", genre: \"東方Project\"},
          {title: \"儚きもの人間\", genre: \"東方Project\"},
          {title: \"最終鬼畜妹フランドール・S\", genre: \"東方Project\"},
          {title: \"華鳥風月\", genre: \"東方Project\"},
          {title: \"最終鬼畜妹・一部声\", genre: \"東方Project\"},
          {title: \"緋色のDance\", genre: \"東方Project\"},
          {title: \"四次元跳躍機関\", genre: \"東方Project\"},
          {title: \"Yet Another ”drizzly rain”\", genre: \"東方Project\"},
          {title: \"エピクロスの虹はもう見えない\", genre: \"東方Project\"},
          {title: \"Grip & Break down !!\", genre: \"東方Project\"},
          {title: \"Scream out! -CHUNITHM Tuning-\", genre: \"東方Project\"},
          {title: \"WARNING×WARNING×WARNING\", genre: \"東方Project\"},
          {title: \"taboo tears you up\", genre: \"東方Project\"},
          {title: \"Imperishable Night 2006 (2016 Refine)\", genre: \"東方Project\"},
          {title: \"月に叢雲華に風\", genre: \"東方Project\"},
          {title: \"幻想のサテライト\", genre: \"東方Project\"},
          {title: \"Bad Apple!! feat.nomico\", genre: \"東方Project\"},
          {title: \"ナイト・オブ・ナイツ\", genre: \"東方Project\"},
          {title: \"sweet little sister\", genre: \"東方Project\"},
          {title: \"Dreaming\", genre: \"東方Project\"},
          {title: \"Unlimited Spark!\", genre: \"東方Project\"},
          {title: \"Fracture Ray\", genre: \"VARIETY\"},
          {title: \"Axium Crisis\", genre: \"VARIETY\"},
          {title: \"Grievous Lady\", genre: \"VARIETY\"},
          {title: \"Auxesia\", genre: \"VARIETY\"},
          {title: \"Cyaegha\", genre: \"VARIETY\"},
          {title: \"Arcahv\", genre: \"VARIETY\"},
          {title: \"AttraqtiA\", genre: \"VARIETY\"},
          {title: \"Finite\", genre: \"VARIETY\"},
          {title: \"神威\", genre: \"VARIETY\"},
          {title: \"Brain Power\", genre: \"VARIETY\"},
          {title: \"BlythE\", genre: \"VARIETY\"},
          {title: \"Super Lovely (Heavenly Remix)\", genre: \"VARIETY\"},
          {title: \"Ladymade Star\", genre: \"VARIETY\"},
          {title: \"Memory of Beach\", genre: \"VARIETY\"},
          {title: \"SON OF SUN\", genre: \"VARIETY\"},
          {title: \"Sound Chimera\", genre: \"VARIETY\"},
          {title: \"セイクリッド　ルイン\", genre: \"VARIETY\"},
          {title: \"極圏\", genre: \"VARIETY\"},
          {title: \"Scarlet Lance\", genre: \"VARIETY\"},
          {title: \"Taiko Drum Monster\", genre: \"VARIETY\"},
          {title: \"GERBERA\", genre: \"VARIETY\"},
          {title: \"ouroboros -twin stroke of the end-\", genre: \"VARIETY\"},
          {title: \"L9\", genre: \"VARIETY\"},
          {title: \"Altale\", genre: \"VARIETY\"},
          {title: \"Aragami\", genre: \"VARIETY\"},
          {title: \"B.B.K.K.B.K.K.\", genre: \"VARIETY\"},
          {title: \"conflict\", genre: \"VARIETY\"},
          {title: \"Halcyon\", genre: \"VARIETY\"},
          {title: \"DRAGONLADY\", genre: \"VARIETY\"},
          {title: \"FREEDOM DiVE\", genre: \"VARIETY\"},
          {title: \"DataErr0r\", genre: \"VARIETY\"},
          {title: \"GOODTEK\", genre: \"VARIETY\"},
          {title: \"AVALON\", genre: \"VARIETY\"},
          {title: \"Destr0yer\", genre: \"VARIETY\"},
          {title: \"檄!帝国華撃団\", genre: \"VARIETY\"},
          {title: \"Through The Tower\", genre: \"VARIETY\"},
          {title: \"ハート・ビート\", genre: \"イロドリミドリ\"},
          {title: \"brilliant better\", genre: \"イロドリミドリ\"},
          {title: \"フォルテシモBELL\", genre: \"イロドリミドリ\"},
          {title: \"私の中の幻想的世界観及びその顕現を想起させたある現実での出来事に関する一考察\", genre: \"イロドリミドリ\"},
          {title: \"DETARAME ROCK&ROLL THEORY\", genre: \"イロドリミドリ\"},
          {title: \"猛進ソリストライフ！\", genre: \"イロドリミドリ\"},
          {title: \"My Dearest Song\", genre: \"イロドリミドリ\"},
          {title: \"SPICY SWINGY STYLE\", genre: \"イロドリミドリ\"},
          {title: \"Bang Babang Bang!!!\", genre: \"イロドリミドリ\"},
          {title: \"Tic Tac DREAMIN’\", genre: \"イロドリミドリ\"},
          {title: \"TRUST\", genre: \"イロドリミドリ\"},
          {title: \"猫祭り\", genre: \"イロドリミドリ\"},
          {title: \"conflict(斉唱)\", genre: \"イロドリミドリ\"},
          {title: \"Change Our MIRAI！\", genre: \"イロドリミドリ\"},
          {title: \"無敵We are one!!\", genre: \"イロドリミドリ\"},
          {title: \"ドキドキDREAM!!!\", genre: \"イロドリミドリ\"},
          {title: \"Still\", genre: \"イロドリミドリ\"},
          {title: \"言ノ葉カルマ\", genre: \"ゲキマイ\"},
          {title: \"言ノ葉遊戯\", genre: \"ゲキマイ\"},
          {title: \"洗脳\", genre: \"ゲキマイ\"},
          {title: \"空威張りビヘイビア\", genre: \"ゲキマイ\"},
          {title: \"天国と地獄 -言ノ葉リンネ-\", genre: \"ゲキマイ\"},
          {title: \"悪戯\", genre: \"ゲキマイ\"},
          {title: \"りばーぶ\", genre: \"ゲキマイ\"},
          {title: \"Barbed Eye\", genre: \"ゲキマイ\"},
          {title: \"分からない\", genre: \"ゲキマイ\"},
          {title: \"相思創愛\", genre: \"ゲキマイ\"},
          {title: \"咲キ誇レ常世ノ華\", genre: \"ゲキマイ\"},
          {title: \"Garakuta Doll Play\", genre: \"ゲキマイ\"},
          {title: \"Like the Wind [Reborn]\", genre: \"ゲキマイ\"},
          {title: \"AMAZING MIGHTYYYY!!!!\", genre: \"ゲキマイ\"},
          {title: \"VERTeX\", genre: \"ゲキマイ\"},
          {title: \"Hyper Active\", genre: \"ゲキマイ\"},
          {title: \"L'épilogue\", genre: \"ゲキマイ\"},
          {title: \"D✪N’T ST✪P R✪CKIN’ ～[✪_✪] MIX～\", genre: \"ゲキマイ\"},
          {title: \"Caliburne ～Story of the Legendary sword～\", genre: \"ゲキマイ\"},
          {title: \"ねぇ、壊れタ人形ハ何処へ棄テらレるノ？\", genre: \"ゲキマイ\"},
          {title: \"larva\", genre: \"ゲキマイ\"},
          {title: \"CITRUS MONSTER\", genre: \"ゲキマイ\"},
          {title: \"CYCLES\", genre: \"ゲキマイ\"},
          {title: \"高気圧ねこロック\", genre: \"ゲキマイ\"},
          {title: \"FEEL the BEATS\", genre: \"ゲキマイ\"},
          {title: \"夢花火\", genre: \"ゲキマイ\"},
          {title: \"Excalibur ～Revived resolution～\", genre: \"ゲキマイ\"},
          {title: \"Oshama Scramble!\", genre: \"ゲキマイ\"},
          {title: \"Alea jacta est!\", genre: \"ゲキマイ\"},
          {title: \"STARTLINER\", genre: \"ゲキマイ\"},
          {title: \"Viyella's Tears\", genre: \"ゲキマイ\"},
          {title: \"Invitation\", genre: \"ORIGINAL\"},
          {title: \"ＧＯ！ＧＯ！ラブリズム♥\", genre: \"ORIGINAL\"},
          {title: \"Theme of SeelischTact\", genre: \"ORIGINAL\"},
          {title: \"Infantoon Fantasy\", genre: \"ORIGINAL\"},
          {title: \"Counselor\", genre: \"ORIGINAL\"},
          {title: \"Guilty\", genre: \"ORIGINAL\"},
          {title: \"幾四音-Ixion-\", genre: \"ORIGINAL\"},
          {title: \"Grab your sword\", genre: \"ORIGINAL\"},
          {title: \"My First Phone\", genre: \"ORIGINAL\"},
          {title: \"今ぞ♡崇め奉れ☆オマエらよ！！～姫の秘メタル渇望～\", genre: \"ORIGINAL\"},
          {title: \"Anemone\", genre: \"ORIGINAL\"},
          {title: \"リリーシア\", genre: \"ORIGINAL\"},
          {title: \"砂漠のハンティングガール♡\", genre: \"ORIGINAL\"},
          {title: \"昵懇レファレンス\", genre: \"ORIGINAL\"},
          {title: \"Teriqma\", genre: \"ORIGINAL\"},
          {title: \"After the rain\", genre: \"ORIGINAL\"},
          {title: \"The ether\", genre: \"ORIGINAL\"},
          {title: \"We Gonna Journey\", genre: \"ORIGINAL\"},
          {title: \"overcome\", genre: \"ORIGINAL\"},
          {title: \"Memories of Sun and Moon\", genre: \"ORIGINAL\"},
          {title: \"luna blu\", genre: \"ORIGINAL\"},
          {title: \"閃鋼のブリューナク\", genre: \"ORIGINAL\"},
          {title: \"Gate of Fate\", genre: \"ORIGINAL\"},
          {title: \"こころここから\", genre: \"ORIGINAL\"},
          {title: \"The wheel to the right\", genre: \"ORIGINAL\"},
          {title: \"Alma\", genre: \"ORIGINAL\"},
          {title: \"STAR\", genre: \"ORIGINAL\"},
          {title: \"Tango Rouge\", genre: \"ORIGINAL\"},
          {title: \"Gustav Battle\", genre: \"ORIGINAL\"},
          {title: \"怒槌\", genre: \"ORIGINAL\"},
          {title: \"夕暮れワンルーム\", genre: \"ORIGINAL\"},
          {title: \"乗り切れ受験ウォーズ\", genre: \"ORIGINAL\"},
          {title: \"stella=steLLa\", genre: \"ORIGINAL\"},
          {title: \"とーきょー全域★アキハバラ？\", genre: \"ORIGINAL\"},
          {title: \"エンドマークに希望と涙を添えて\", genre: \"ORIGINAL\"},
          {title: \"SNIPE WHOLE\", genre: \"ORIGINAL\"},
          {title: \"MUSIC PЯAYER\", genre: \"ORIGINAL\"},
          {title: \"Cyberozar\", genre: \"ORIGINAL\"},
          {title: \"Genesis\", genre: \"ORIGINAL\"},
          {title: \"名も無い鳥\", genre: \"ORIGINAL\"},
          {title: \"L'épisode\", genre: \"ORIGINAL\"},
          {title: \"GOLDEN RULE\", genre: \"ORIGINAL\"},
          {title: \"宛城、炎上！！\", genre: \"ORIGINAL\"},
          {title: \"Trrricksters!!\", genre: \"ORIGINAL\"},
          {title: \"《混乱》 ～ Muspell\", genre: \"ORIGINAL\"},
          {title: \"《理想》 ～ Cloudland\", genre: \"ORIGINAL\"},
          {title: \"《逃避》 ～ The Deserter\", genre: \"ORIGINAL\"},
          {title: \"《最愛》 ～ Curse\", genre: \"ORIGINAL\"},
          {title: \"《運命》 ～ Ray of Hope\", genre: \"ORIGINAL\"},
          {title: \"《破滅》 ～ Rhapsody for The End\", genre: \"ORIGINAL\"},
          {title: \"玩具狂奏曲 -終焉-\", genre: \"ORIGINAL\"},
          {title: \"TiamaT:F minor\", genre: \"ORIGINAL\"},
          {title: \"混沌を越えし我らが神聖なる調律主を讃えよ\", genre: \"ORIGINAL\"},
          {title: \"GIGA DRIVE\", genre: \"ORIGINAL\"},
          {title: \"Contrapasso -inferno-\", genre: \"ORIGINAL\"},
          {title: \"popcorn\", genre: \"ORIGINAL\"},
          {title: \"Pastel Party\", genre: \"ORIGINAL\"},
          {title: \"はちみつアドベンチャー\", genre: \"ORIGINAL\"},
          {title: \"CHOCOLATE BOMB!!!!\", genre: \"ORIGINAL\"},
          {title: \"Twilight\", genre: \"ORIGINAL\"},
          {title: \"First Twinkle\", genre: \"ORIGINAL\"},
          {title: \"最愛テトラグラマトン\", genre: \"ORIGINAL\"},
          {title: \"ゲシュタルト！テスト期間！！\", genre: \"ORIGINAL\"},
          {title: \"おまかせ！！トラブルメイ娘☆とれびちゃん\", genre: \"ORIGINAL\"},
          {title: \"願い星\", genre: \"ORIGINAL\"},
          {title: \"オススメ☆♂♀☆でぃすとぴあ\", genre: \"ORIGINAL\"},
          {title: \"朝焼けプラットホーム\", genre: \"ORIGINAL\"},
          {title: \"RevolutionGame\", genre: \"ORIGINAL\"},
          {title: \"明るい未来\", genre: \"ORIGINAL\"},
          {title: \"D.E.A.D.L.Y.\", genre: \"ORIGINAL\"},
          {title: \"立川浄穢捕物帳\", genre: \"ORIGINAL\"},
          {title: \"Supersonic Generation\", genre: \"ORIGINAL\"},
          {title: \"Climax\", genre: \"ORIGINAL\"},
          {title: \"宿星審判\", genre: \"ORIGINAL\"},
        ], // end of music genre

        outer: [
          {title: \"▲MEW▲△MEW△CAKE\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"8\", MASTER: \"11\"},
          {title: \"前前前世\", BASIC: \"3\", ADVANCED: \"5\", EXPERT: \"8+\", MASTER: \"11+\"},
          {title: \"God knows...\", BASIC: \"2\", ADVANCED: \"6\", EXPERT: \"9\", MASTER: \"12\"},
          {title: \"五等分の気持ち\", BASIC: \"3\", ADVANCED: \"5\", EXPERT: \"9+\", MASTER: \"11\"},
          {title: \"ただ君に晴れ\", BASIC: \"2\", ADVANCED: \"5\", EXPERT: \"8\", MASTER: \"10+\"},
          {title: \"ゴーゴー幽霊船\", BASIC: \"3\", ADVANCED: \"5\", EXPERT: \"9+\", MASTER: \"12\"},
          {title: \"ようこそジャパリパークへ\", BASIC: \"3\", ADVANCED: \"5\", EXPERT: \"9\", MASTER: \"12\"},
          {title: \"ラブリー☆えんじぇる!!\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9\", MASTER: \"12\"},
          {title: \"シュガーソングとビターステップ\", BASIC: \"2\", ADVANCED: \"5\", EXPERT: \"9\", MASTER: \"12\"},
          {title: \"深海少女\", BASIC: \"3\", ADVANCED: \"5\", EXPERT: \"8\", MASTER: \"11+\"},
          {title: \"害虫\", BASIC: \"4\", ADVANCED: \"7\", EXPERT: \"10\", MASTER: \"13\"},
          {title: \"ゴーストルール\", BASIC: \"3\", ADVANCED: \"5\", EXPERT: \"9+\", MASTER: \"12+\"},
          {title: \"StargazeR\", BASIC: \"2\", ADVANCED: \"5\", EXPERT: \"8+\", MASTER: \"12\"},
          {title: \"DAYBREAK FRONTLINE\", BASIC: \"2\", ADVANCED: \"5\", EXPERT: \"9\", MASTER: \"11\"},
          {title: \"バレリーコ\", BASIC: \"3\", ADVANCED: \"5\", EXPERT: \"9\", MASTER: \"11+\"},
          {title: \"ワールズエンド・ダンスホール\", BASIC: \"2\", ADVANCED: \"6\", EXPERT: \"9\", MASTER: \"12\"},
          {title: \"ヒビカセ\", BASIC: \"3\", ADVANCED: \"5\", EXPERT: \"9\", MASTER: \"12\"},
          {title: \"白い雪のプリンセスは\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9\", MASTER: \"12\"},
          {title: \"イカサマライフゲイム\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9+\", MASTER: \"12\"},
          {title: \"一触即発☆禅ガール\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9\", MASTER: \"12\"},
          {title: \"命に嫌われている\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9\", MASTER: \"12+\"},
          {title: \"乙女解剖\", BASIC: \"2\", ADVANCED: \"5\", EXPERT: \"8\", MASTER: \"11+\"},
          {title: \"フィクサー\", BASIC: \"2\", ADVANCED: \"5\", EXPERT: \"9+\", MASTER: \"12\"},
          {title: \"ダブルラリアット\", BASIC: \"2\", ADVANCED: \"5\", EXPERT: \"9\", MASTER: \"11\"},
          {title: \"アマツキツネ\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9\", MASTER: \"11+\"},
          {title: \"桜ノ雨\", BASIC: \"1\", ADVANCED: \"4\", EXPERT: \"8\", MASTER: \"11\"},
          {title: \"リモコン\", BASIC: \"3\", ADVANCED: \"5\", EXPERT: \"8\", MASTER: \"11+\"},
          {title: \"カミサマネジマキ\", BASIC: \"3\", ADVANCED: \"7\", EXPERT: \"11\", MASTER: \"13\"},
          {title: \"初音ミクの消失\", BASIC: \"5\", ADVANCED: \"8\", EXPERT: \"11+\", MASTER: \"13\"},
          {title: \"みくみくにしてあげる♪【してやんよ】\", BASIC: \"3\", ADVANCED: \"5\", EXPERT: \"8+\", MASTER: \"11\"},
          {title: \"愛言葉\", BASIC: \"2\", ADVANCED: \"4\", EXPERT: \"8\", MASTER: \"11\"},
          {title: \"ビバハピ\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9\", MASTER: \"11+\"},
          {title: \"Hand in Hand\", BASIC: \"3\", ADVANCED: \"5\", EXPERT: \"8+\", MASTER: \"11+\"},
          {title: \"ODDS&ENDS\", BASIC: \"2\", ADVANCED: \"5\", EXPERT: \"9\", MASTER: \"10\"},
          {title: \"ユクエシレズ\", BASIC: \"2\", ADVANCED: \"5\", EXPERT: \"8\", MASTER: \"10+\"},
          {title: \"ぼくらの16bit戦争\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9+\", MASTER: \"13\"},
          {title: \"すろぉもぉしょん\", BASIC: \"3\", ADVANCED: \"5\", EXPERT: \"8\", MASTER: \"11\"},
          {title: \"裏表ラバーズ\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9\", MASTER: \"11+\"},
          {title: \"ネトゲ廃人シュプレヒコール\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9\", MASTER: \"11+\"},
          {title: \"おねがいダーリン\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"8+\", MASTER: \"12\"},
          {title: \"カゲロウデイズ\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"8+\", MASTER: \"12+\"},
          {title: \"ロキ\", BASIC: \"2\", ADVANCED: \"5\", EXPERT: \"9\", MASTER: \"12\"},
          {title: \"放課後ストライド\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9\", MASTER: \"12\"},
          {title: \"アンノウン・マザーグース\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9\", MASTER: \"12\"},
          {title: \"いーあるふぁんくらぶ\", BASIC: \"2\", ADVANCED: \"5\", EXPERT: \"8\", MASTER: \"11\"},
          {title: \"ウミユリ海底譚\", BASIC: \"3\", ADVANCED: \"5\", EXPERT: \"9+\", MASTER: \"12\"},
          {title: \"アスノヨゾラ哨戒班\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9\", MASTER: \"12\"},
          {title: \"天樂\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9+\", MASTER: \"12\"},
          {title: \"Crazy ∞ nighT\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"8+\", MASTER: \"12\"},
          {title: \"脳漿炸裂ガール\", BASIC: \"3\", ADVANCED: \"7\", EXPERT: \"10+\", MASTER: \"12+\"},
          {title: \"FREELY TOMORROW\", BASIC: \"2\", ADVANCED: \"4\", EXPERT: \"8\", MASTER: \"11\"},
          {title: \"ギガンティックO.T.N\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"10\", MASTER: \"13\"},
          {title: \"シリョクケンサ\", BASIC: \"3\", ADVANCED: \"5\", EXPERT: \"7\", MASTER: \"11\"},
          {title: \"セツナトリップ\", BASIC: \"2\", ADVANCED: \"5\", EXPERT: \"8\", MASTER: \"12+\"},
          {title: \"六兆年と一夜物語\", BASIC: \"3\", ADVANCED: \"5\", EXPERT: \"9+\", MASTER: \"12\"},
          {title: \"Sweet Devil\", BASIC: \"2\", ADVANCED: \"4\", EXPERT: \"8+\", MASTER: \"11+\"},
          {title: \"天ノ弱\", BASIC: \"2\", ADVANCED: \"5\", EXPERT: \"8\", MASTER: \"11\"},
          {title: \"ストリーミングハート\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"8\", MASTER: \"11\"},
          {title: \"腐れ外道とチョコレゐト\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9+\", MASTER: \"12\"},
          {title: \"M.S.S.Planet\", BASIC: \"2\", ADVANCED: \"5\", EXPERT: \"8+\", MASTER: \"11+\"},
          {title: \"タイガーランペイジ\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9+\", MASTER: \"12\"},
          {title: \"ロストワンの号哭\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9\", MASTER: \"12\"},
          {title: \"橙の幻想郷音頭\", BASIC: \"1\", ADVANCED: \"4\", EXPERT: \"8\", MASTER: \"10+\"},
          {title: \"蒼空に舞え、墨染の桜\", BASIC: \"3\", ADVANCED: \"5\", EXPERT: \"8+\", MASTER: \"12\"},
          {title: \"少女幻葬戦慄曲　～　Necro Fantasia\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9\", MASTER: \"12+\"},
          {title: \"星色夜空\", BASIC: \"2\", ADVANCED: \"4\", EXPERT: \"8\", MASTER: \"10\"},
          {title: \"物凄い勢いでけーねが物凄いうた\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9\", MASTER: \"12\"},
          {title: \"きゅうりバーにダイブ\", BASIC: \"3\", ADVANCED: \"5\", EXPERT: \"9\", MASTER: \"13\"},
          {title: \"色は匂へど散りぬるを\", BASIC: \"2\", ADVANCED: \"4\", EXPERT: \"8+\", MASTER: \"11\"},
          {title: \"LOVE EAST\", BASIC: \"2\", ADVANCED: \"6\", EXPERT: \"9\", MASTER: \"12\"},
          {title: \"チルノおかんのさいきょう☆バイブスごはん\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9+\", MASTER: \"12\"},
          {title: \"Floating Darkness\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9\", MASTER: \"12+\"},
          {title: \"Bad Apple!! feat.nomico (Nhato Remix)\", BASIC: \"2\", ADVANCED: \"6\", EXPERT: \"8+\", MASTER: \"12\"},
          {title: \"進捗どうですか？\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9\", MASTER: \"12\"},
          {title: \"お嫁にしなさいっ！\", BASIC: \"3\", ADVANCED: \"5\", EXPERT: \"8+\", MASTER: \"12\"},
          {title: \"サドマミホリック\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"11\", MASTER: \"13\"},
          {title: \"Spring of Dreams\", BASIC: \"3\", ADVANCED: \"5\", EXPERT: \"8+\", MASTER: \"12\"},
          {title: \"Witches night\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"8+\", MASTER: \"12\"},
          {title: \"Calamity Fortune\", BASIC: \"4\", ADVANCED: \"8+\", EXPERT: \"11\", MASTER: \"13+\"},
          {title: \"儚きもの人間\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9+\", MASTER: \"12\"},
          {title: \"最終鬼畜妹フランドール・S\", BASIC: \"4\", ADVANCED: \"7\", EXPERT: \"10\", MASTER: \"13\"},
          {title: \"華鳥風月\", BASIC: \"2\", ADVANCED: \"4\", EXPERT: \"8+\", MASTER: \"11\"},
          {title: \"最終鬼畜妹・一部声\", BASIC: \"3\", ADVANCED: \"7\", EXPERT: \"10\", MASTER: \"13\"},
          {title: \"緋色のDance\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9\", MASTER: \"12\"},
          {title: \"四次元跳躍機関\", BASIC: \"2\", ADVANCED: \"5\", EXPERT: \"8\", MASTER: \"12+\"},
          {title: \"Yet Another ”drizzly rain”\", BASIC: \"3\", ADVANCED: \"5\", EXPERT: \"9\", MASTER: \"11+\"},
          {title: \"エピクロスの虹はもう見えない\", BASIC: \"2\", ADVANCED: \"4\", EXPERT: \"8\", MASTER: \"10\"},
          {title: \"Grip & Break down !!\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9\", MASTER: \"12\"},
          {title: \"Scream out! -CHUNITHM Tuning-\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9+\", MASTER: \"12\"},
          {title: \"WARNING×WARNING×WARNING\", BASIC: \"3\", ADVANCED: \"5\", EXPERT: \"9+\", MASTER: \"12\"},
          {title: \"taboo tears you up\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9\", MASTER: \"12+\"},
          {title: \"Imperishable Night 2006 (2016 Refine)\", BASIC: \"4\", ADVANCED: \"7+\", EXPERT: \"11\", MASTER: \"13\"},
          {title: \"月に叢雲華に風\", BASIC: \"3\", ADVANCED: \"5\", EXPERT: \"8\", MASTER: \"12\"},
          {title: \"幻想のサテライト\", BASIC: \"3\", ADVANCED: \"7\", EXPERT: \"11\", MASTER: \"13\"},
          {title: \"Bad Apple!! feat.nomico\", BASIC: \"1\", ADVANCED: \"5\", EXPERT: \"8\", MASTER: \"11\"},
          {title: \"ナイト・オブ・ナイツ\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9\", MASTER: \"11+\"},
          {title: \"sweet little sister\", BASIC: \"3\", ADVANCED: \"5\", EXPERT: \"9\", MASTER: \"11\"},
          {title: \"Dreaming\", BASIC: \"2\", ADVANCED: \"5\", EXPERT: \"8\", MASTER: \"11+\"},
          {title: \"Unlimited Spark!\", BASIC: \"3\", ADVANCED: \"5\", EXPERT: \"9\", MASTER: \"11+\"},
          {title: \"Fracture Ray\", BASIC: \"4\", ADVANCED: \"8\", EXPERT: \"12\", MASTER: \"13+\"},
          {title: \"Axium Crisis\", BASIC: \"3\", ADVANCED: \"7\", EXPERT: \"10+\", MASTER: \"12+\"},
          {title: \"Grievous Lady\", BASIC: \"4\", ADVANCED: \"9\", EXPERT: \"12\", MASTER: \"13+\"},
          {title: \"Auxesia\", BASIC: \"3\", ADVANCED: \"7\", EXPERT: \"10+\", MASTER: \"12+\"},
          {title: \"Cyaegha\", BASIC: \"4\", ADVANCED: \"8\", EXPERT: \"11\", MASTER: \"13\"},
          {title: \"Arcahv\", BASIC: \"3\", ADVANCED: \"7+\", EXPERT: \"11+\", MASTER: \"13\"},
          {title: \"AttraqtiA\", BASIC: \"4\", ADVANCED: \"8\", EXPERT: \"12\", MASTER: \"13+\"},
          {title: \"Finite\", BASIC: \"3\", ADVANCED: \"7\", EXPERT: \"10+\", MASTER: \"13+\"},
          {title: \"神威\", BASIC: \"5\", ADVANCED: \"8+\", EXPERT: \"12+\", MASTER: \"13+\"},
          {title: \"Brain Power\", BASIC: \"3\", ADVANCED: \"7\", EXPERT: \"11\", MASTER: \"13\"},
          {title: \"BlythE\", BASIC: \"3\", ADVANCED: \"7\", EXPERT: \"11\", MASTER: \"13\"},
          {title: \"Super Lovely (Heavenly Remix)\", BASIC: \"4\", ADVANCED: \"6\", EXPERT: \"9\", MASTER: \"13\"},
          {title: \"Ladymade Star\", BASIC: \"2\", ADVANCED: \"5\", EXPERT: \"8\", MASTER: \"11+\"},
          {title: \"Memory of Beach\", BASIC: \"2\", ADVANCED: \"5\", EXPERT: \"10\", MASTER: \"12+\"},
          {title: \"SON OF SUN\", BASIC: \"5\", ADVANCED: \"7+\", EXPERT: \"12+\", MASTER: \"13+\"},
          {title: \"Sound Chimera\", BASIC: \"4\", ADVANCED: \"9\", EXPERT: \"11\", MASTER: \"13+\"},
          {title: \"セイクリッド　ルイン\", BASIC: \"3\", ADVANCED: \"7\", EXPERT: \"11\", MASTER: \"13\"},
          {title: \"極圏\", BASIC: \"4\", ADVANCED: \"7\", EXPERT: \"11+\", MASTER: \"13\"},
          {title: \"Scarlet Lance\", BASIC: \"4\", ADVANCED: \"7+\", EXPERT: \"11+\", MASTER: \"13\"},
          {title: \"Taiko Drum Monster\", BASIC: \"3\", ADVANCED: \"7\", EXPERT: \"11\", MASTER: \"13\"},
          {title: \"GERBERA\", BASIC: \"4\", ADVANCED: \"8\", EXPERT: \"11+\", MASTER: \"13\"},
          {title: \"ouroboros -twin stroke of the end-\", BASIC: \"3\", ADVANCED: \"8\", EXPERT: \"10+\", MASTER: \"13+\"},
          {title: \"L9\", BASIC: \"4\", ADVANCED: \"6\", EXPERT: \"9+\", MASTER: \"12\"},
          {title: \"Altale\", BASIC: \"3\", ADVANCED: \"5\", EXPERT: \"9\", MASTER: \"12+\"},
          {title: \"Aragami\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9\", MASTER: \"13\"},
          {title: \"B.B.K.K.B.K.K.\", BASIC: \"3\", ADVANCED: \"5\", EXPERT: \"10\", MASTER: \"11+\"},
          {title: \"conflict\", BASIC: \"4\", ADVANCED: \"6\", EXPERT: \"10+\", MASTER: \"13\"},
          {title: \"Halcyon\", BASIC: \"3\", ADVANCED: \"7\", EXPERT: \"10+\", MASTER: \"13\"},
          {title: \"DRAGONLADY\", BASIC: \"4\", ADVANCED: \"6\", EXPERT: \"11\", MASTER: \"13\"},
          {title: \"FREEDOM DiVE\", BASIC: \"5\", ADVANCED: \"8\", EXPERT: \"11\", MASTER: \"13+\"},
          {title: \"DataErr0r\", BASIC: \"3\", ADVANCED: \"7\", EXPERT: \"10\", MASTER: \"13\"},
          {title: \"GOODTEK\", BASIC: \"4\", ADVANCED: \"7\", EXPERT: \"10+\", MASTER: \"13\"},
          {title: \"AVALON\", BASIC: \"4\", ADVANCED: \"7+\", EXPERT: \"11+\", MASTER: \"13\"},
          {title: \"Destr0yer\", BASIC: \"4\", ADVANCED: \"7\", EXPERT: \"11\", MASTER: \"13\"},
          {title: \"檄!帝国華撃団\", BASIC: \"2\", ADVANCED: \"4\", EXPERT: \"8\", MASTER: \"11\"},
          {title: \"Through The Tower\", BASIC: \"2\", ADVANCED: \"5\", EXPERT: \"9\", MASTER: \"12\"},
          {title: \"ハート・ビート\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"10\", MASTER: \"12\"},
          {title: \"brilliant better\", BASIC: \"3\", ADVANCED: \"5\", EXPERT: \"10\", MASTER: \"11+\"},
          {title: \"フォルテシモBELL\", BASIC: \"2\", ADVANCED: \"5\", EXPERT: \"8+\", MASTER: \"11\"},
          {title: \"私の中の幻想的世界観及びその顕現を想起させたある現実での出来事に関する一考察\", 
            BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9\", MASTER: \"12\"},
          {title: \"DETARAME ROCK&ROLL THEORY\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9\", MASTER: \"11\"},
          {title: \"猛進ソリストライフ！\", BASIC: \"4\", ADVANCED: \"7\", EXPERT: \"9+\", MASTER: \"12\"},
          {title: \"My Dearest Song\", BASIC: \"3\", ADVANCED: \"5\", EXPERT: \"8+\", MASTER: \"12\"},
          {title: \"SPICY SWINGY STYLE\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9+\", MASTER: \"12\"},
          {title: \"Bang Babang Bang!!!\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"10+\", MASTER: \"12+\"},
          {title: \"Tic Tac DREAMIN’\", BASIC: \"3\", ADVANCED: \"5\", EXPERT: \"8+\", MASTER: \"11+\"},
          {title: \"TRUST\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9\", MASTER: \"12\"},
          {title: \"猫祭り\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9+\", MASTER: \"12\"},
          {title: \"conflict(斉唱)\", BASIC: \"4\", ADVANCED: \"7\", EXPERT: \"10+\", MASTER: \"13\"},
          {title: \"Change Our MIRAI！\", BASIC: \"3\", ADVANCED: \"5\", EXPERT: \"8+\", MASTER: \"11+\"},
          {title: \"無敵We are one!!\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9+\", MASTER: \"12\"},
          {title: \"ドキドキDREAM!!!\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9+\", MASTER: \"12\"},
          {title: \"Still\", BASIC: \"3\", ADVANCED: \"5\", EXPERT: \"9\", MASTER: \"12\"},
          {title: \"言ノ葉カルマ\", BASIC: \"3\", ADVANCED: \"7\", EXPERT: \"9+\", MASTER: \"12\"},
          {title: \"言ノ葉遊戯\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9\", MASTER: \"11\"},
          {title: \"洗脳\", BASIC: \"2\", ADVANCED: \"5\", EXPERT: \"8\", MASTER: \"11\"},
          {title: \"空威張りビヘイビア\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9\", MASTER: \"12\"},
          {title: \"天国と地獄 -言ノ葉リンネ-\", BASIC: \"2\", ADVANCED: \"5\", EXPERT: \"9\", MASTER: \"11+\"},
          {title: \"悪戯\", BASIC: \"3\", ADVANCED: \"5\", EXPERT: \"9\", MASTER: \"12\"},
          {title: \"りばーぶ\", BASIC: \"2\", ADVANCED: \"4\", EXPERT: \"8\", MASTER: \"11\"},
          {title: \"Barbed Eye\", BASIC: \"3\", ADVANCED: \"5\", EXPERT: \"9\", MASTER: \"12\"},
          {title: \"分からない\", BASIC: \"3\", ADVANCED: \"7\", EXPERT: \"10+\", MASTER: \"13\"},
          {title: \"相思創愛\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9+\", MASTER: \"12\"},
          {title: \"咲キ誇レ常世ノ華\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9\", MASTER: \"12\"},
          {title: \"Garakuta Doll Play\", BASIC: \"5\", ADVANCED: \"8+\", EXPERT: \"12\", MASTER: \"13+\"},
          {title: \"Like the Wind [Reborn]\", BASIC: \"4\", ADVANCED: \"8\", EXPERT: \"11\", MASTER: \"13\"},
          {title: \"AMAZING MIGHTYYYY!!!!\", BASIC: \"4\", ADVANCED: \"8+\", EXPERT: \"12\", MASTER: \"13+\"},
          {title: \"VERTeX\", BASIC: \"4\", ADVANCED: \"8+\", EXPERT: \"11+\", MASTER: \"13+\"},
          {title: \"Hyper Active\", BASIC: \"3\", ADVANCED: \"7\", EXPERT: \"10+\", MASTER: \"13\"},
          {title: \"L'épilogue\", BASIC: \"2\", ADVANCED: \"5\", EXPERT: \"9+\", MASTER: \"12\"},
          {title: \"D✪N’T ST✪P R✪CKIN’ ～[✪_✪] MIX～\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9\", MASTER: \"12\"},
          {title: \"Caliburne ～Story of the Legendary sword～\", 
            BASIC: \"4\", ADVANCED: \"8\", EXPERT: \"12\", MASTER: \"13+\"},
          {title: \"ねぇ、壊れタ人形ハ何処へ棄テらレるノ？\", BASIC: \"4\", ADVANCED: \"8\", EXPERT: \"12\", MASTER: \"13+\"},
          {title: \"larva\", BASIC: \"4\", ADVANCED: \"8+\", EXPERT: \"11+\", MASTER: \"13+\"},
          {title: \"CITRUS MONSTER\", BASIC: \"4\", ADVANCED: \"8\", EXPERT: \"12\", MASTER: \"13\"},
          {title: \"CYCLES\", BASIC: \"2\", ADVANCED: \"5\", EXPERT: \"8+\", MASTER: \"11+\"},
          {title: \"高気圧ねこロック\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"10\", MASTER: \"12\"},
          {title: \"FEEL the BEATS\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9\", MASTER: \"11+\"},
          {title: \"夢花火\", BASIC: \"2\", ADVANCED: \"5\", EXPERT: \"9\", MASTER: \"12\"},
          {title: \"Excalibur ～Revived resolution～\", BASIC: \"4\", ADVANCED: \"8\", EXPERT: \"12\", MASTER: \"13+\"},
          {title: \"Oshama Scramble!\", BASIC: \"4\", ADVANCED: \"8\", EXPERT: \"11\", MASTER: \"13\"},
          {title: \"Alea jacta est!\", BASIC: \"3\", ADVANCED: \"8\", EXPERT: \"12\", MASTER: \"13+\"},
          {title: \"STARTLINER\", BASIC: \"1\", ADVANCED: \"5\", EXPERT: \"7+\", MASTER: \"10\"},
          {title: \"Viyella's Tears\", BASIC: \"4\", ADVANCED: \"9\", EXPERT: \"12+\", MASTER: \"13+\"},
          {title: \"Invitation\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"8+\", MASTER: \"11\"},
          {title: \"ＧＯ！ＧＯ！ラブリズム♥\", BASIC: \"3\", ADVANCED: \"5\", EXPERT: \"9+\", MASTER: \"11\"},
          {title: \"Theme of SeelischTact\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9\", MASTER: \"11\"},
          {title: \"Infantoon Fantasy\", BASIC: \"5\", ADVANCED: \"7\", EXPERT: \"9+\", MASTER: \"12\"},
          {title: \"Counselor\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9+\", MASTER: \"11+\"},
          {title: \"Guilty\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9\", MASTER: \"11+\"},
          {title: \"幾四音-Ixion-\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9\", MASTER: \"11\"},
          {title: \"Grab your sword\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"8\", MASTER: \"10\"},
          {title: \"My First Phone\", BASIC: \"2\", ADVANCED: \"4\", EXPERT: \"10\", MASTER: \"12+\"},
          {title: \"今ぞ♡崇め奉れ☆オマエらよ！！～姫の秘メタル渇望～\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9\", MASTER: \"12+\"},
          {title: \"Anemone\", BASIC: \"2\", ADVANCED: \"5\", EXPERT: \"9\", MASTER: \"11\"},
          {title: \"リリーシア\", BASIC: \"2\", ADVANCED: \"5\", EXPERT: \"8+\", MASTER: \"11\"},
          {title: \"砂漠のハンティングガール♡\", BASIC: \"3\", ADVANCED: \"5\", EXPERT: \"9\", MASTER: \"12\"},
          {title: \"昵懇レファレンス\", BASIC: \"3\", ADVANCED: \"5\", EXPERT: \"9\", MASTER: \"11\"},
          {title: \"Teriqma\", BASIC: \"2\", ADVANCED: \"5\", EXPERT: \"10\", MASTER: \"12\"},
          {title: \"After the rain\", BASIC: \"2\", ADVANCED: \"5\", EXPERT: \"8\", MASTER: \"11\"},
          {title: \"The ether\", BASIC: \"3\", ADVANCED: \"5\", EXPERT: \"10+\", MASTER: \"12\"},
          {title: \"We Gonna Journey\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"11\", MASTER: \"13\"},
          {title: \"overcome\", BASIC: \"2\", ADVANCED: \"4\", EXPERT: \"8+\", MASTER: \"11\"},
          {title: \"Memories of Sun and Moon\", BASIC: \"4\", ADVANCED: \"6\", EXPERT: \"8\", MASTER: \"12\"},
          {title: \"luna blu\", BASIC: \"3\", ADVANCED: \"9\", EXPERT: \"12\", MASTER: \"13\"},
          {title: \"閃鋼のブリューナク\", BASIC: \"4\", ADVANCED: \"9\", EXPERT: \"11+\", MASTER: \"13\"},
          {title: \"Gate of Fate\", BASIC: \"6\", ADVANCED: \"9\", EXPERT: \"11+\", MASTER: \"13\"},
          {title: \"こころここから\", BASIC: \"2\", ADVANCED: \"5\", EXPERT: \"8+\", MASTER: \"10\"},
          {title: \"The wheel to the right\", BASIC: \"4\", ADVANCED: \"9\", EXPERT: \"11+\", MASTER: \"13\"},
          {title: \"Alma\", BASIC: \"3\", ADVANCED: \"5\", EXPERT: \"9\", MASTER: \"12+\"},
          {title: \"STAR\", BASIC: \"3\", ADVANCED: \"5\", EXPERT: \"9+\", MASTER: \"12\"},
          {title: \"Tango Rouge\", BASIC: \"3\", ADVANCED: \"7+\", EXPERT: \"10+\", MASTER: \"13\"},
          {title: \"Gustav Battle\", BASIC: \"4\", ADVANCED: \"7\", EXPERT: \"12\", MASTER: \"13\"},
          {title: \"怒槌\", BASIC: \"6\", ADVANCED: \"9+\", EXPERT: \"12+\", MASTER: \"14\"},
          {title: \"夕暮れワンルーム\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"10\", MASTER: \"11+\"},
          {title: \"乗り切れ受験ウォーズ\", BASIC: \"2\", ADVANCED: \"5\", EXPERT: \"8+\", MASTER: \"11\"},
          {title: \"stella=steLLa\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"10\", MASTER: \"12+\"},
          {title: \"とーきょー全域★アキハバラ？\", BASIC: \"3\", ADVANCED: \"7\", EXPERT: \"10\", MASTER: \"12\"},
          {title: \"エンドマークに希望と涙を添えて\", BASIC: \"4\", ADVANCED: \"7\", EXPERT: \"11+\", MASTER: \"13+\"},
          {title: \"SNIPE WHOLE\", BASIC: \"4\", ADVANCED: \"6\", EXPERT: \"10+\", MASTER: \"12+\"},
          {title: \"MUSIC PЯAYER\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"10\", MASTER: \"12+\"},
          {title: \"Cyberozar\", BASIC: \"4\", ADVANCED: \"7+\", EXPERT: \"11\", MASTER: \"13\"},
          {title: \"Genesis\", BASIC: \"3\", ADVANCED: \"5\", EXPERT: \"10\", MASTER: \"13\"},
          {title: \"名も無い鳥\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9+\", MASTER: \"12\"},
          {title: \"L'épisode\", BASIC: \"4\", ADVANCED: \"7+\", EXPERT: \"12\", MASTER: \"13\"},
          {title: \"GOLDEN RULE\", BASIC: \"4\", ADVANCED: \"7\", EXPERT: \"11\", MASTER: \"13\"},
          {title: \"宛城、炎上！！\", BASIC: \"5\", ADVANCED: \"9\", EXPERT: \"12\", MASTER: \"13+\"},
          {title: \"Trrricksters!!\", BASIC: \"4\", ADVANCED: \"9+\", EXPERT: \"12+\", MASTER: \"14\"},
          {title: \"《混乱》 ～ Muspell\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"11\", MASTER: \"12+\"},
          {title: \"《理想》 ～ Cloudland\", BASIC: \"2\", ADVANCED: \"4\", EXPERT: \"9+\", MASTER: \"12\"},
          {title: \"《逃避》 ～ The Deserter\", BASIC: \"2\", ADVANCED: \"6\", EXPERT: \"10+\", MASTER: \"12+\"},
          {title: \"《最愛》 ～ Curse\", BASIC: \"3\", ADVANCED: \"5\", EXPERT: \"9\", MASTER: \"12\"},
          {title: \"《運命》 ～ Ray of Hope\", BASIC: \"4\", ADVANCED: \"8\", EXPERT: \"11\", MASTER: \"13\"},
          {title: \"《破滅》 ～ Rhapsody for The End\", BASIC: \"4\", ADVANCED: \"8+\", EXPERT: \"12\", MASTER: \"13+\"},
          {title: \"玩具狂奏曲 -終焉-\", BASIC: \"5\", ADVANCED: \"9\", EXPERT: \"12+\", MASTER: \"14\"},
          {title: \"TiamaT:F minor\", BASIC: \"4\", ADVANCED: \"9\", EXPERT: \"12+\", MASTER: \"14\"},
          {title: \"混沌を越えし我らが神聖なる調律主を讃えよ\", BASIC: \"5\", ADVANCED: \"9+\", EXPERT: \"13\", MASTER: \"14\"},
          {title: \"GIGA DRIVE\", BASIC: \"4\", ADVANCED: \"9\", EXPERT: \"12+\", MASTER: \"13+\"},
          {title: \"Contrapasso -inferno-\", BASIC: \"4\", ADVANCED: \"9+\", EXPERT: \"12\", MASTER: \"13+\"},
          {title: \"popcorn\", BASIC: \"2\", ADVANCED: \"6\", EXPERT: \"9+\", MASTER: \"11+\"},
          {title: \"Pastel Party\", BASIC: \"2\", ADVANCED: \"6\", EXPERT: \"10+\", MASTER: \"12+\"},
          {title: \"はちみつアドベンチャー\", BASIC: \"3\", ADVANCED: \"5\", EXPERT: \"9\", MASTER: \"12\"},
          {title: \"CHOCOLATE BOMB!!!!\", BASIC: \"3\", ADVANCED: \"7\", EXPERT: \"10+\", MASTER: \"13\"},
          {title: \"Twilight\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"11\", MASTER: \"13\"},
          {title: \"First Twinkle\", BASIC: \"3\", ADVANCED: \"5\", EXPERT: \"8+\", MASTER: \"11\"},
          {title: \"最愛テトラグラマトン\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9+\", MASTER: \"12+\"},
          {title: \"ゲシュタルト！テスト期間！！\", BASIC: \"3\", ADVANCED: \"5\", EXPERT: \"9\", MASTER: \"12+\"},
          {title: \"おまかせ！！トラブルメイ娘☆とれびちゃん\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9+\", MASTER: \"13\"},
          {title: \"願い星\", BASIC: \"3\", ADVANCED: \"5\", EXPERT: \"8+\", MASTER: \"11\"},
          {title: \"オススメ☆♂♀☆でぃすとぴあ\", BASIC: \"4\", ADVANCED: \"7+\", EXPERT: \"10\", MASTER: \"13\"},
          {title: \"朝焼けプラットホーム\", BASIC: \"3\", ADVANCED: \"5\", EXPERT: \"9\", MASTER: \"11\"},
          {title: \"RevolutionGame\", BASIC: \"2\", ADVANCED: \"5\", EXPERT: \"8+\", MASTER: \"11+\"},
          {title: \"明るい未来\", BASIC: \"4\", ADVANCED: \"6\", EXPERT: \"9\", MASTER: \"12\"},
          {title: \"D.E.A.D.L.Y.\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9\", MASTER: \"12\"},
          {title: \"立川浄穢捕物帳\", BASIC: \"3\", ADVANCED: \"6\", EXPERT: \"9+\", MASTER: \"13\"},
          {title: \"Supersonic Generation\", BASIC: \"4\", ADVANCED: \"7\", EXPERT: \"11\", MASTER: \"13\"},
          {title: \"Climax\", BASIC: \"4\", ADVANCED: \"9+\", EXPERT: \"12+\", MASTER: \"13+\"},
          {title: \"宿星審判\", BASIC: \"4\", ADVANCED: \"9+\", EXPERT: \"12+\", MASTER: \"14\"},
        ], // end of outer difficulty

        inner: [
          {title: \"▲MEW▲△MEW△CAKE\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.3},
          {title: \"前前前世\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.9},
          {title: \"God knows...\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.3},
          {title: \"五等分の気持ち\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.4},
          {title: \"ただ君に晴れ\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 10.8},
          {title: \"ゴーゴー幽霊船\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.5},
          {title: \"ようこそジャパリパークへ\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.1},
          {title: \"ラブリー☆えんじぇる!!\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.3},
          {title: \"シュガーソングとビターステップ\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.2},
          {title: \"深海少女\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.7},
          {title: \"害虫\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 13.2},
          {title: \"ゴーストルール\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.7},
          {title: \"StargazeR\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.2},
          {title: \"DAYBREAK FRONTLINE\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.5},
          {title: \"バレリーコ\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.7},
          {title: \"ワールズエンド・ダンスホール\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.3},
          {title: \"ヒビカセ\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.5},
          {title: \"白い雪のプリンセスは\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.2},
          {title: \"イカサマライフゲイム\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.2},
          {title: \"一触即発☆禅ガール\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.3},
          {title: \"命に嫌われている\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.7},
          {title: \"乙女解剖\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.8},
          {title: \"フィクサー\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.5},
          {title: \"ダブルラリアット\", BASIC: 0, ADVANCED: 0, EXPERT: 9.2, MASTER: 11.3},
          {title: \"アマツキツネ\", BASIC: 0, ADVANCED: 0, EXPERT: 9.1, MASTER: 11.8},
          {title: \"桜ノ雨\", BASIC: 0, ADVANCED: 0, EXPERT: 8.0, MASTER: 11.0},
          {title: \"リモコン\", BASIC: 0, ADVANCED: 0, EXPERT: 8.6, MASTER: 11.8},
          {title: \"カミサマネジマキ\", BASIC: 0, ADVANCED: 0, EXPERT: 11.0, MASTER: 13.0},
          {title: \"初音ミクの消失\", BASIC: 0, ADVANCED: 0, EXPERT: 11.9, MASTER: 13.4},
          {title: \"みくみくにしてあげる♪【してやんよ】\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.5},
          {title: \"愛言葉\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.5},
          {title: \"ビバハピ\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.9},
          {title: \"Hand in Hand\", BASIC: 0, ADVANCED: 5.0, EXPERT: 0, MASTER: 11.7},
          {title: \"ODDS&ENDS\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 10.6},
          {title: \"ユクエシレズ\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 10.8},
          {title: \"ぼくらの16bit戦争\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 13.0},
          {title: \"すろぉもぉしょん\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.3},
          {title: \"裏表ラバーズ\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.8},
          {title: \"ネトゲ廃人シュプレヒコール\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.9},
          {title: \"おねがいダーリン\", BASIC: 0, ADVANCED: 6.0, EXPERT: 0, MASTER: 12.1},
          {title: \"カゲロウデイズ\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.7},
          {title: \"ロキ\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.0},
          {title: \"放課後ストライド\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.1},
          {title: \"アンノウン・マザーグース\", BASIC: 0, ADVANCED: 0, EXPERT: 9.3, MASTER: 12.6},
          {title: \"いーあるふぁんくらぶ\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.4},
          {title: \"ウミユリ海底譚\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.1},
          {title: \"アスノヨゾラ哨戒班\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.4},
          {title: \"天樂\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.2},
          {title: \"Crazy ∞ nighT\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.5},
          {title: \"脳漿炸裂ガール\", BASIC: 0, ADVANCED: 7.0, EXPERT: 0, MASTER: 12.7},
          {title: \"FREELY TOMORROW\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.4},
          {title: \"ギガンティックO.T.N\", BASIC: 0, ADVANCED: 6.0, EXPERT: 10.0, MASTER: 13.0},
          {title: \"シリョクケンサ\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.5},
          {title: \"セツナトリップ\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.7},
          {title: \"六兆年と一夜物語\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.5},
          {title: \"Sweet Devil\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.9},
          {title: \"天ノ弱\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.1},
          {title: \"ストリーミングハート\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.4},
          {title: \"腐れ外道とチョコレゐト\", BASIC: 0, ADVANCED: 0, EXPERT: 9.7, MASTER: 12.3},
          {title: \"M.S.S.Planet\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.9},
          {title: \"タイガーランペイジ\", BASIC: 0, ADVANCED: 0, EXPERT: 9.9, MASTER: 12.5},
          {title: \"ロストワンの号哭\", BASIC: 0, ADVANCED: 6.0, EXPERT: 0, MASTER: 12.4},
          {title: \"橙の幻想郷音頭\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 10.7},
          {title: \"蒼空に舞え、墨染の桜\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.3},
          {title: \"少女幻葬戦慄曲　～　Necro Fantasia\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.7},
          {title: \"星色夜空\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 10.2},
          {title: \"物凄い勢いでけーねが物凄いうた\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.2},
          {title: \"きゅうりバーにダイブ\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 13.3},
          {title: \"色は匂へど散りぬるを\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.2},
          {title: \"LOVE EAST\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.2},
          {title: \"チルノおかんのさいきょう☆バイブスごはん\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.6},
          {title: \"Floating Darkness\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.7},
          {title: \"Bad Apple!! feat.nomico (Nhato Remix)\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.3},
          {title: \"進捗どうですか？\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.3},
          {title: \"お嫁にしなさいっ！\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.5},
          {title: \"サドマミホリック\", BASIC: 0, ADVANCED: 0, EXPERT: 11.4, MASTER: 13.2},
          {title: \"Spring of Dreams\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.2},
          {title: \"Witches night\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.0},
          {title: \"Calamity Fortune\", BASIC: 0, ADVANCED: 8.7, EXPERT: 11.5, MASTER: 13.7},
          {title: \"儚きもの人間\", BASIC: 0, ADVANCED: 0, EXPERT: 9.9, MASTER: 12.5},
          {title: \"最終鬼畜妹フランドール・S\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 13.4},
          {title: \"華鳥風月\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.5},
          {title: \"最終鬼畜妹・一部声\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 13.0},
          {title: \"緋色のDance\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.2},
          {title: \"四次元跳躍機関\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.7},
          {title: \"Yet Another ”drizzly rain”\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.7},
          {title: \"エピクロスの虹はもう見えない\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 10.0},
          {title: \"Grip & Break down !!\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.3},
          {title: \"Scream out! -CHUNITHM Tuning-\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.4},
          {title: \"WARNING×WARNING×WARNING\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.4},
          {title: \"taboo tears you up\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.8},
          {title: \"Imperishable Night 2006 (2016 Refine)\", BASIC: 0, ADVANCED: 0, EXPERT: 11.5, MASTER: 13.6},
          {title: \"月に叢雲華に風\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.1},
          {title: \"幻想のサテライト\", BASIC: 0, ADVANCED: 0, EXPERT: 11.0, MASTER: 13.1},
          {title: \"Bad Apple!! feat.nomico\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.0},
          {title: \"ナイト・オブ・ナイツ\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.9},
          {title: \"sweet little sister\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.6},
          {title: \"Dreaming\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.7},
          {title: \"Unlimited Spark!\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.8},
          {title: \"Fracture Ray\", BASIC: 0, ADVANCED: 0, EXPERT: 12.0, MASTER: 13.7},
          {title: \"Axium Crisis\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.7},
          {title: \"Grievous Lady\", BASIC: 0, ADVANCED: 0, EXPERT: 12.2, MASTER: 13.7},
          {title: \"Auxesia\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.7},
          {title: \"Cyaegha\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 13.5},
          {title: \"Arcahv\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 13.1},
          {title: \"AttraqtiA\", BASIC: 0, ADVANCED: 0, EXPERT: 12.5, MASTER: 13.8},
          {title: \"Finite\", BASIC: 0, ADVANCED: 0, EXPERT: 10.9, MASTER: 13.9},
          {title: \"神威\", BASIC: 0, ADVANCED: 0, EXPERT: 12.7, MASTER: 13.9},
          {title: \"Brain Power\", BASIC: 0, ADVANCED: 0, EXPERT: 11.0, MASTER: 13.3},
          {title: \"BlythE\", BASIC: 0, ADVANCED: 0, EXPERT: 11.6, MASTER: 13.2},
          {title: \"Super Lovely (Heavenly Remix)\", BASIC: 0, ADVANCED: 0, EXPERT: 9.5, MASTER: 13.4},
          {title: \"Ladymade Star\", BASIC: 0, ADVANCED: 0, EXPERT: 8.4, MASTER: 11.7},
          {title: \"Memory of Beach\", BASIC: 0, ADVANCED: 0, EXPERT: 10.3, MASTER: 12.7},
          {title: \"SON OF SUN\", BASIC: 0, ADVANCED: 0, EXPERT: 12.7, MASTER: 13.8},
          {title: \"Sound Chimera\", BASIC: 0, ADVANCED: 9.0, EXPERT: 11.0, MASTER: 13.8},
          {title: \"セイクリッド　ルイン\", BASIC: 0, ADVANCED: 0, EXPERT: 11.3, MASTER: 13.5},
          {title: \"極圏\", BASIC: 0, ADVANCED: 0, EXPERT: 11.7, MASTER: 13.6},
          {title: \"Scarlet Lance\", BASIC: 0, ADVANCED: 0, EXPERT: 11.9, MASTER: 13.6},
          {title: \"Taiko Drum Monster\", BASIC: 0, ADVANCED: 0, EXPERT: 11.5, MASTER: 13.4},
          {title: \"GERBERA\", BASIC: 0, ADVANCED: 0, EXPERT: 11.7, MASTER: 13.6},
          {title: \"ouroboros -twin stroke of the end-\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 13.7},
          {title: \"L9\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.6},
          {title: \"Altale\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.7},
          {title: \"Aragami\", BASIC: 0, ADVANCED: 0, EXPERT: 9.3, MASTER: 13.5},
          {title: \"B.B.K.K.B.K.K.\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.8},
          {title: \"conflict\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 13.3},
          {title: \"Halcyon\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 13.3},
          {title: \"DRAGONLADY\", BASIC: 0, ADVANCED: 0, EXPERT: 11.4, MASTER: 13.2},
          {title: \"FREEDOM DiVE\", BASIC: 0, ADVANCED: 8.5, EXPERT: 11.5, MASTER: 13.8},
          {title: \"DataErr0r\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 13.0},
          {title: \"GOODTEK\", BASIC: 0, ADVANCED: 0, EXPERT: 10.7, MASTER: 13.3},
          {title: \"AVALON\", BASIC: 0, ADVANCED: 0, EXPERT: 11.7, MASTER: 13.5},
          {title: \"Destr0yer\", BASIC: 0, ADVANCED: 0, EXPERT: 11.2, MASTER: 13.5},
          {title: \"檄!帝国華撃団\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.3},
          {title: \"Through The Tower\", BASIC: 0, ADVANCED: 0, EXPERT: 9.5, MASTER: 12.4},
          {title: \"ハート・ビート\", BASIC: 0, ADVANCED: 0, EXPERT: 10.0, MASTER: 12.1},
          {title: \"brilliant better\", BASIC: 0, ADVANCED: 0, EXPERT: 10.0, MASTER: 11.8},
          {title: \"フォルテシモBELL\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.0},
          {title: \"私の中の幻想的世界観及びその顕現を想起させたある現実での出来事に関する一考察\", 
            BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.5},
          {title: \"DETARAME ROCK&ROLL THEORY\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.2},
          {title: \"猛進ソリストライフ！\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.2},
          {title: \"My Dearest Song\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.2},
          {title: \"SPICY SWINGY STYLE\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.3},
          {title: \"Bang Babang Bang!!!\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.8},
          {title: \"Tic Tac DREAMIN’\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.8},
          {title: \"TRUST\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.4},
          {title: \"猫祭り\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.3},
          {title: \"conflict(斉唱)\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 13.3},
          {title: \"Change Our MIRAI！\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.8},
          {title: \"無敵We are one!!\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.1},
          {title: \"ドキドキDREAM!!!\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.1},
          {title: \"Still\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.5},
          {title: \"言ノ葉カルマ\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.0},
          {title: \"言ノ葉遊戯\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.6},
          {title: \"洗脳\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.5},
          {title: \"空威張りビヘイビア\", BASIC: 0, ADVANCED: 0, EXPERT: 9.0, MASTER: 12.3},
          {title: \"天国と地獄 -言ノ葉リンネ-\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.8},
          {title: \"悪戯\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.2},
          {title: \"りばーぶ\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.2},
          {title: \"Barbed Eye\", BASIC: 0, ADVANCED: 0, EXPERT: 9.4, MASTER: 12.0},
          {title: \"分からない\", BASIC: 0, ADVANCED: 0, EXPERT: 10.7, MASTER: 13.2},
          {title: \"相思創愛\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.4},
          {title: \"咲キ誇レ常世ノ華\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.4},
          {title: \"Garakuta Doll Play\", BASIC: 0, ADVANCED: 0, EXPERT: 12.3, MASTER: 13.8},
          {title: \"Like the Wind [Reborn]\", BASIC: 0, ADVANCED: 0, EXPERT: 11.0, MASTER: 13.5},
          {title: \"AMAZING MIGHTYYYY!!!!\", BASIC: 0, ADVANCED: 0, EXPERT: 12.0, MASTER: 13.8},
          {title: \"VERTeX\", BASIC: 0, ADVANCED: 0, EXPERT: 11.9, MASTER: 13.7},
          {title: \"Hyper Active\", BASIC: 0, ADVANCED: 0, EXPERT: 10.7, MASTER: 13.3},
          {title: \"L'épilogue\", BASIC: 0, ADVANCED: 0, EXPERT: 9.8, MASTER: 12.5},
          {title: \"D✪N’T ST✪P R✪CKIN’ ～[✪_✪] MIX～\", BASIC: 0, ADVANCED: 0, EXPERT: 9.5, MASTER: 12.5},
          {title: \"Caliburne ～Story of the Legendary sword～\", BASIC: 0, ADVANCED: 0, EXPERT: 12.2, MASTER: 13.8},
          {title: \"ねぇ、壊れタ人形ハ何処へ棄テらレるノ？\", BASIC: 0, ADVANCED: 0, EXPERT: 12.4, MASTER: 13.8},
          {title: \"larva\", BASIC: 0, ADVANCED: 0, EXPERT: 11.9, MASTER: 13.7},
          {title: \"CITRUS MONSTER\", BASIC: 0, ADVANCED: 0, EXPERT: 12.0, MASTER: 13.6},
          {title: \"CYCLES\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.9},
          {title: \"高気圧ねこロック\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.6},
          {title: \"FEEL the BEATS\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.9},
          {title: \"夢花火\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.3},
          {title: \"Excalibur ～Revived resolution～\", BASIC: 0, ADVANCED: 0, EXPERT: 12.3, MASTER: 13.8},
          {title: \"Oshama Scramble!\", BASIC: 0, ADVANCED: 0, EXPERT: 11.3, MASTER: 13.1},
          {title: \"Alea jacta est!\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 13.7},
          {title: \"STARTLINER\", BASIC: 0, ADVANCED: 0, EXPERT: 7.9, MASTER: 10.6},
          {title: \"Viyella's Tears\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 13.9},
          {title: \"Invitation\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.3},
          {title: \"ＧＯ！ＧＯ！ラブリズム♥\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.1},
          {title: \"Theme of SeelischTact\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.5},
          {title: \"Infantoon Fantasy\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.4},
          {title: \"Counselor\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.7},
          {title: \"Guilty\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.9},
          {title: \"幾四音-Ixion-\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.3},
          {title: \"Grab your sword\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 10.5},
          {title: \"My First Phone\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.8},
          {title: \"今ぞ♡崇め奉れ☆オマエらよ！！～姫の秘メタル渇望～\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.8},
          {title: \"Anemone\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.1},
          {title: \"リリーシア\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.0},
          {title: \"砂漠のハンティングガール♡\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.1},
          {title: \"昵懇レファレンス\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.2},
          {title: \"Teriqma\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.3},
          {title: \"After the rain\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.3},
          {title: \"The ether\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.2},
          {title: \"We Gonna Journey\", BASIC: 0, ADVANCED: 0, EXPERT: 11.0, MASTER: 13.1},
          {title: \"overcome\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.0},
          {title: \"Memories of Sun and Moon\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.5},
          {title: \"luna blu\", BASIC: 0, ADVANCED: 0, EXPERT: 12.4, MASTER: 13.5},
          {title: \"閃鋼のブリューナク\", BASIC: 0, ADVANCED: 0, EXPERT: 11.9, MASTER: 13.5},
          {title: \"Gate of Fate\", BASIC: 0, ADVANCED: 0, EXPERT: 11.7, MASTER: 13.4},
          {title: \"こころここから\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 10.3},
          {title: \"The wheel to the right\", BASIC: 0, ADVANCED: 0, EXPERT: 11.9, MASTER: 13.4},
          {title: \"Alma\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.7},
          {title: \"STAR\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.4},
          {title: \"Tango Rouge\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 13.1},
          {title: \"Gustav Battle\", BASIC: 0, ADVANCED: 0, EXPERT: 12.2, MASTER: 13.0},
          {title: \"怒槌\", BASIC: 0, ADVANCED: 0, EXPERT: 12.8, MASTER: 14.0},
          {title: \"夕暮れワンルーム\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.7},
          {title: \"乗り切れ受験ウォーズ\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.5},
          {title: \"stella=steLLa\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.7},
          {title: \"とーきょー全域★アキハバラ？\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.5},
          {title: \"エンドマークに希望と涙を添えて\", BASIC: 0, ADVANCED: 0, EXPERT: 11.7, MASTER: 13.8},
          {title: \"SNIPE WHOLE\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.7},
          {title: \"MUSIC PЯAYER\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.8},
          {title: \"Cyberozar\", BASIC: 0, ADVANCED: 0, EXPERT: 11.1, MASTER: 13.2},
          {title: \"Genesis\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 13.5},
          {title: \"名も無い鳥\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.5},
          {title: \"L'épisode\", BASIC: 0, ADVANCED: 0, EXPERT: 12.1, MASTER: 13.6},
          {title: \"GOLDEN RULE\", BASIC: 0, ADVANCED: 0, EXPERT: 11.0, MASTER: 13.6},
          {title: \"宛城、炎上！！\", BASIC: 0, ADVANCED: 0, EXPERT: 12.2, MASTER: 13.8},
          {title: \"Trrricksters!!\", BASIC: 0, ADVANCED: 0, EXPERT: 12.7, MASTER: 14.0},
          {title: \"《混乱》 ～ Muspell\", BASIC: 0, ADVANCED: 0, EXPERT: 11.0, MASTER: 12.7},
          {title: \"《理想》 ～ Cloudland\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.2},
          {title: \"《逃避》 ～ The Deserter\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.9},
          {title: \"《最愛》 ～ Curse\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.6},
          {title: \"《運命》 ～ Ray of Hope\", BASIC: 0, ADVANCED: 0, EXPERT: 11.4, MASTER: 13.4},
          {title: \"《破滅》 ～ Rhapsody for The End\", BASIC: 0, ADVANCED: 0, EXPERT: 12.4, MASTER: 13.9},
          {title: \"玩具狂奏曲 -終焉-\", BASIC: 0, ADVANCED: 0, EXPERT: 12.7, MASTER: 14.0},
          {title: \"TiamaT:F minor\", BASIC: 0, ADVANCED: 0, EXPERT: 12.7, MASTER: 14.0},
          {title: \"混沌を越えし我らが神聖なる調律主を讃えよ\", BASIC: 0, ADVANCED: 0, EXPERT: 13.3, MASTER: 14.1},
          {title: \"GIGA DRIVE\", BASIC: 0, ADVANCED: 0, EXPERT: 12.7, MASTER: 13.9},
          {title: \"Contrapasso -inferno-\", BASIC: 0, ADVANCED: 0, EXPERT: 12.1, MASTER: 13.9},
          {title: \"popcorn\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.9},
          {title: \"Pastel Party\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.9},
          {title: \"はちみつアドベンチャー\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.4},
          {title: \"CHOCOLATE BOMB!!!!\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 13.3},
          {title: \"Twilight\", BASIC: 0, ADVANCED: 0, EXPERT: 11.4, MASTER: 13.5},
          {title: \"First Twinkle\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.6},
          {title: \"最愛テトラグラマトン\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.7},
          {title: \"ゲシュタルト！テスト期間！！\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.7},
          {title: \"おまかせ！！トラブルメイ娘☆とれびちゃん\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 13.1},
          {title: \"願い星\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.6},
          {title: \"オススメ☆♂♀☆でぃすとぴあ\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 13.4},
          {title: \"朝焼けプラットホーム\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.6},
          {title: \"RevolutionGame\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 11.7},
          {title: \"明るい未来\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.3},
          {title: \"D.E.A.D.L.Y.\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 12.4},
          {title: \"立川浄穢捕物帳\", BASIC: 0, ADVANCED: 0, EXPERT: 0, MASTER: 13.0},
          {title: \"Supersonic Generation\", BASIC: 0, ADVANCED: 0, EXPERT: 11.2, MASTER: 13.4},
          {title: \"Climax\", BASIC: 0, ADVANCED: 0, EXPERT: 12.7, MASTER: 13.9},
          {title: \"宿星審判\", BASIC: 0, ADVANCED: 0, EXPERT: 12.8, MASTER: 14.0},
        ], // end of inner difficulty
      }), // end of data

      computed: {
        recentheaders() {
          let ppp = this;
          if (this.recentCols.length == 0) {
            return this.headers.filter(x => ppp.recentAvaialeCols.includes(x.value));
          } else {
            return this.headers.filter(x => ppp.recentAvaialeCols.includes(x.value) 
              && ppp.recentCols.includes(ppp.recentAvaialeCols.indexOf(x.value)));
          }
        },

        bestheaders() {
          let ppp = this;
          if (this.bestCols.length == 0) {
            return this.headers.filter(x => ppp.bestAvaialeCols.includes(x.value));
          } else {
            return this.headers.filter(x => ppp.bestAvaialeCols.includes(x.value) 
              && ppp.bestCols.includes(ppp.bestAvaialeCols.indexOf(x.value)));
          }
        },

        headers() {
          return [
            { text: 'title', value: 'title' },      
            { text: 'diff', value: 'diff', 
              filter: value => {
                if (this.filterDiffs.length == 0) return true
                return this.filterDiffs.includes(this.allDiff.indexOf(value))
              },
            },   
            { text: 'outer', value: 'outer', 
              filter: value => {
                if (this.filterOuters.length == 0) return true
                return this.filterOuters.includes(this.filterableOuter.indexOf(value))
              },
            },
            { text: 'score', value: 'score' },   
            { text: 'rank', value: 'rank', 
              filter: value => {
                if (this.filterRanks.length == 0) return true
                return this.filterRanks.includes(this.filterableRanks.indexOf(value))
              },
            },
            { text: 'genre', value: 'genre', 
              filter: value => {
                if (this.filterGenres.length == 0) return true
                return this.filterGenres.includes(this.genre.indexOf(value))
              },
            },
            //{ text: 'lamps', value: 'lamps' },    // document.getElementsByClassName(\"play_musicdata_icon\");
              
              /*{ text: 'tap', value: 'tap' },
              { text: 'hold', value: 'hold' },
              { text: 'slide', value: 'slide' },
              { text: 'air', value: 'air' },
                { text: 'flick', value: 'flick' },
              { text: 'CJ', value: 'critical' },
              { text: 'J', value: 'justice' },
              { text: 'A', value: 'attack' },
              { text: 'M', value: 'miss' },
              { text: 'MaxCombo', value: 'maxCombo' },*/
            { text: 'rating', value: 'rating' },
            { text: 'internal', value: 'internal' },
              //{ text: 'nextRank', value: 'nextRank' },
                  // sdvx.in link
              // youtube link
            { text: 'goal', value: 'goal' },
            { text: 'best30', value: 'best30' },  
            { text: 'track', value: 'track' },     
            { text: 'when', value: 'when' },   
          ]
        }, // end of headers()
      }, // end of computed

      methods: {
        /*closeChu2() {
          if (confirm('確定要離開？')) {
            this.chu2dialog = false;
          }      
        },*/

        diffColor(diff) {
          let c = { BASIC: \"#19aa19\", ADVANCED: \"#f55000\", EXPERT: \"#a00a50\", MASTER: \"#8200dc\" };
          return \"color:\" + c[diff];
        },

        ratingColor(rate) {
          if (rate < 2.0) return \"color:blue\";
          if (rate < 4.0) return \"color:green\";
          if (rate < 7.0) return \"color:orange\";
          if (rate < 10.0) return \"color:red\";
          if (rate < 12.0) return \"color:purple\";
          if (rate < 13.0) return \"color:#cd853f\";
          if (rate < 14.0) return \"color:silver\";
          if (rate < 14.5) return \"color:gold\";
          if (rate < 15.0) return \"color:#fffacd\";
          return \"color:#00fa9a\";
        },

        score2rank(score){
          return score >= 1007500 ? 'SSS' : 
            score >= 1005000 ? 'SS+' : 
            score >= 1000000 ? 'SS' : 
            score >= 975000 ? 'S' :
            score >= 950000 ? 'AAA' : 
            score >= 925000 ? 'AA' : 
            score >= 900000 ? 'A' :
            score >= 800000 ? 'BBB' : 
            score >= 700000 ? 'BB' : 
            score >= 600000 ? 'B' :
            score >= 500000 ? 'C' : 'D';
        },

        calRating(score, internal){
          let ans = score >= 1007500 ? internal + 2 :
            score >= 1005000 ? (score - 1005000) / 2500 * 0.5 + internal + 1.5 :
            score >= 1000000 ? (score - 1000000) / 5000 * 0.5 + internal + 1.0 :
            score >= 975000 ? (score - 975000) / 25000 + internal :
            score >= 925000 ? (score - 925000) / 50000 * 3 + internal - 3 :
            score >= 900000 ? (score - 900000) / 25000 * 2 + internal - 5 :
            score >= 800000 ? (score - 800000) / 100000 * internal / 2 + (internal - 5) / 2 :
            score >= 500000 ? (score - 500000) / 300000 * (internal - 5) / 2 :
            0;
          if(ans < 0.0) ans = 0.0;
          return ans;
        },

        findInternal(title, diff, outer){
          let ans = this.inner.find(x => x.title == title)[diff];
          if(ans < 0.5) ans = outer.endsWith('+') ? parseInt(outer) + 0.8 : parseInt(outer) <= 6 ? parseInt(outer) : parseInt(outer) + 0.3;
          return ans;
        },

        put2RecentArray(cover, title, score, track, when, diff){
          this.recent = [];
          
          for (let i = 0; i < when.length; i++) {
            var o = {};
            o.cover = cover[i];
            o.title = title[i];
            o.score = score[i];
            o.track = track[i];
            o.when = when[i];
            o.diff = diff[i];
            o.rank = this.score2rank(o.score);

            if( this.music_genre.find(x => x.title == o.title) == undefined ) continue;

            o.genre = this.music_genre.find(x => x.title == o.title).genre;
            o.outer = this.outer.find(x => x.title == o.title)[o.diff];
            o.internal = this.findInternal(o.title, o.diff, o.outer);
            o.rating = this.calRating(o.score, o.internal);
            o.rating = o.rating.toFixed(5);
            this.recent.push(o);
          } // end of for loop for each score
        },

        getRecentScores() {
          var reg = this;
          fetch('https://chunithm-net-eng.com/mobile/record/playlog', {credentials: 'include'})
          .then(function (response) {
            return response.text()
          }).then(function (html) {
            var doc = new DOMParser().parseFromString(html, 'text/html');

            // extract fields in page
            var cover = Array.from(doc.querySelectorAll('.play_jacket_img')).map(x => x.childNodes[0].src);
            var title = Array.from(doc.querySelectorAll('.play_musicdata_title')).map(x => x.innerText);
            var score = Array.from(doc.querySelectorAll('.play_musicdata_score_text')).map(x => parseInt(x.innerText.substring(6).replaceAll(',', '')));
            var track = Array.from(doc.querySelectorAll('.play_track_text')).map(x => parseInt(x.innerText.substring(6)));
            var when = Array.from(doc.querySelectorAll('.play_datalist_date')).map(x => x.innerText);
            var diff = Array.from(doc.querySelectorAll('.play_track_result')).map(x => x.childNodes[0].src.substring(53).replace('.png', '').toUpperCase());

            reg.put2RecentArray(cover, title, score, track, when, diff);
          }).catch(function (err) {
            //reg.snacktext = \"無法讀取成績\";
            //reg.snackbar = true;
          });
        }, // end of getRecentScores()

        calBest30() {
          let reg = this;
          
          // fill in column \"best30\" by rating in order
          let orderByRating = reg.mybest.filter(x => x.score > 0);
          orderByRating.sort(function (a, b) { return b.rating - a.rating; });       
          for (let a = 0; a < orderByRating.length; a++) {
            reg.mybest.find(x => x.title == orderByRating[a].title && x.diff == orderByRating[a].diff).best30 = a + 1;
          }

          // update statistic 
          reg.playedMap = orderByRating.length;
          reg.lastBestRate = reg.playedMap < 30 ? 
            reg.mybest.find(x => x.best30 == reg.playedMap).rating : 
            reg.mybest.find(x => x.best30 == 30).rating;
          reg.maxBestRating = orderByRating[0].rating;
                
          reg.averageOfBest = 0.0;
          for(let a = 0; a < orderByRating.length && a < 30; a++) {
            reg.averageOfBest += parseFloat(orderByRating[a].rating);
          }
          reg.averageOfBest /= 30.0;
                
          reg.maximumPossibleRate = (reg.averageOfBest * 3.0 + parseFloat(orderByRating[0].rating)) / 4.0;

          // determine goal or impossible
          reg.mybest.forEach(function (b) {
            if( b.internal + 2 <= parseFloat(reg.lastBestRate) ){
              b.goal = 'Impossible';
            }else if(b.best30 <= 30 && b.rank == 'SSS'){
              b.goal = 'Max';
            }else if(b.best30 <= 30){
              b.goal = b.score;
            }else if( b.internal + 1.5 <= parseFloat(reg.lastBestRate) ){
              // SS+ ~ SSS
              b.goal = Math.ceil((parseFloat(reg.lastBestRate) - (b.internal + 1.5)) / 0.5 * 2500 + 1005000);
            }else if( b.internal + 1 <= parseFloat(reg.lastBestRate) ){
              // SS ~ SS+
              b.goal = Math.ceil((parseFloat(reg.lastBestRate) - (b.internal + 1.0)) / 0.5 * 5000 + 1000000);
            }else if( b.internal <= parseFloat(reg.lastBestRate) ){
              // S ~ SS
              b.goal= Math.ceil((parseFloat(reg.lastBestRate) - b.internal) / 1.0 * 25000 + 975000);
            }else if( b.internal - 3.0 <= parseFloat(reg.lastBestRate) ){
              // AA ~ S
              b.goal = Math.ceil((parseFloat(reg.lastBestRate) - (b.internal - 3.0)) / 3.0 * 50000 + 925000);
            }else if( b.internal - 5.0 <= parseFloat(reg.lastBestRate) ){
              // A ~ AA
              b.goal= Math.ceil((parseFloat(reg.lastBestRate) - (b.internal - 5.0)) / 2.0 * 25000 + 900000);
            }else if( (b.internal - 5.0) / 2.0 <= parseFloat(reg.lastBestRate) ){
              // BBB ~ A
              b.goal = Math.ceil((parseFloat(reg.lastBestRate) - (b.internal - 5.0)/2.0) / ((b.internal - 5.0)/2.0) * 100000 + 800000);
            }else{
              // C ~ BBB
              b.goal = Math.ceil(parseFloat(reg.lastBestRate) / ((b.internal - 5.0)/2.0) * 300000 + 500000); 
            }
          }); // end of determine goal
        }, // end of calBest30()

        getBestScores() {
          var reg = this;
          this.mybest = [];
          var getted = 0;
          for(let di in reg.allDiff){     
            // generate empty slots for this difficulty
            for(let song in reg.music_genre){      
              let o = {};
              o.title = reg.music_genre[song].title;
              o.genre = reg.music_genre[song].genre;
              o.diff = reg.allDiff[di];
              o.outer = reg.outer.find(c => c.title == o.title)[o.diff];
              o.score = 0;
              o.rank = 'D';
              o.internal = reg.findInternal(o.title, o.diff, o.outer);
              reg.mybest.push(o);
            } // end of for song in music_genre

            // fetch page and get values
            fetch('https://chunithm-net-eng.com/mobile/record/musicGenre/' + reg.allDiff[di].toLowerCase(), 
              {credentials: 'include'})
            .then(function (response) {
              return response.text()
            }).then(function (html) {
              var doc = new DOMParser().parseFromString(html, 'text/html');
                           
              Array.from(doc.querySelectorAll('.play_musicdata_highscore')).forEach(function (x) {
                let title = x.previousSibling.previousSibling.previousSibling.previousSibling.innerText;
                if( reg.music_genre.find(o => o.title == title) == undefined ) return;
                let entry = reg.mybest.find(s => s.diff == reg.allDiff[di] && s.title == title);
                entry.score = parseInt(x.innerText.trim().substring(11).replaceAll(',', ''));
                entry.rank = reg.score2rank(entry.score);
                entry.rating = reg.calRating(entry.score, entry.internal);
                entry.rating = entry.rating.toFixed(5);                
              }); // end of forEach score in page
            }).then(function(){
              getted += 1;
              if(getted >= 4) reg.calBest30();
            }).catch(function (err) {
              //reg.snacktext = \"無法讀取成績\";
              //reg.snackbar = true;
            }); // end of fetch

            // randomly wait to prevent blocked by SEGA
            let a = 0;
            let top = 10000000 + Math.floor(Math.random()*5000000);
            while (a < top) a++;
          }// end of diff
        }, // end of getBestScores()

        //beforeCreate: function () {
          /*this.chu2dialog = true;
          this.overlay = false;*/
        //},
      }, // end of methods
    })

`;  ///////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////


if( window.location.href.startsWith(baseURL) ){
  document.getElementsByTagName('head')[0].innerHTML = '';
  document.getElementsByTagName('head')[0].innerHTML += "<title>" + title + "</title>";
  document.getElementsByTagName('head')[0].innerHTML += "<link href='https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900' rel='stylesheet'>";
  document.getElementsByTagName('head')[0].innerHTML += "<link href='https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css' rel='stylesheet'>";
  document.getElementsByTagName('head')[0].innerHTML += "<link href='https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css' rel='stylesheet'>";
  document.getElementsByTagName('head')[0].innerHTML += "<meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui'>";
  
  document.getElementsByTagName('body')[0].innerHTML = '';
  document.getElementsByTagName('body')[0].innerHTML += chu2viewHTML;  

  var vue_script = document.createElement('script');
  vue_script.type = 'text/javascript';
  vue_script.src = 'https://cdn.jsdelivr.net/npm/vue@2.x/dist/vue.js';
  document.getElementsByTagName('body')[0].appendChild(vue_script);

  var vuetify_script = document.createElement('script');
  vuetify_script.type = 'text/javascript';
  vuetify_script.src = 'https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.js';
  document.getElementsByTagName('body')[0].appendChild(vuetify_script);

  setTimeout(function() {
    var chu2_script = document.createElement('script');
    chu2_script.type = 'text/javascript';
    chu2_script.innerHTML = chu2_javascript;
    chu2_script.setAttribute("defer", "defer");
    document.getElementsByTagName('body')[0].appendChild(chu2_script);
  }, 1000);
}else{
  window.location.href = baseURL;
}



/*
build database:


https://chunithm-net-eng.com/mobile/record/musicGenre/basic




var result = [];
Array.from(document.querySelectorAll('.box05')).forEach(x => { 
var genre = x.children[0].innerText; 
var p = new DOMParser().parseFromString(x.innerHTML, 'text/html');
Array.from(p.querySelectorAll('.music_title')).map(x => x.innerText).forEach(title => {
var o = {};
o.title = title;
o.genre = genre;
result.push(o);
});
})
console.log(result);




var outer = JSON.parse(localStorage.getItem('adzen'));

var thisdiff = document.querySelectorAll('.box01_title')[0].innerText.replace('LEVEL ','');

Array.from(document.querySelectorAll('.bg_basic')).forEach(function (x){ 
  let i = x.innerText.indexOf('\nHIGH SCORE');
  let t = i >= 0 ? x.innerText.substring(0,i) : x.innerText;
  outer.find(x => x.title == t).BASIC = thisdiff;
});
Array.from(document.querySelectorAll('.bg_advanced')).forEach(function (x){ 
  let i = x.innerText.indexOf('\nHIGH SCORE');
  let t = i >= 0 ? x.innerText.substring(0,i) : x.innerText;
  outer.find(x => x.title == t).ADVANCED = thisdiff;
});
Array.from(document.querySelectorAll('.bg_expert')).forEach(function (x){ 
  let i = x.innerText.indexOf('\nHIGH SCORE');
  let t = i >= 0 ? x.innerText.substring(0,i) : x.innerText;
  outer.find(x => x.title == t).EXPERT = thisdiff;
});
Array.from(document.querySelectorAll('.bg_master')).forEach(function (x){ 
  let i = x.innerText.indexOf('\nHIGH SCORE');
  let t = i >= 0 ? x.innerText.substring(0,i) : x.innerText;
  outer.find(x => x.title == t).MASTER = thisdiff;
});

localStorage.setItem('adzen', JSON.stringify(outer));



*/
