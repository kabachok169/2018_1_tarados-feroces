'use strict';

class LeaderboardView extends BaseView {

    constructor(context) {
        super();
        this.context = context;
    }

    preRender() {
        return httpModule.doGet('/score').then(
            (response) => {
                this.context = response;
            }
        );
    }

    render() {
        return `<div class="leaderboard">
                        <Header>Leaderboard</Header>
                        <div class="table">
                            <div class="table-row">
                                {{#each headers}}
                                <div class="table-data table-header">{{this}}</div>
                                {{/each}}
                            </div>
                            {{#each rows}}
                            <div class="table-row">
                            {{#each this}}  
                                <div class="table-data">
                                {{this}}
                                </div>
                            {{/each}}
                            </div>
                            {{/each}}
                        </div>
                        <Button class="button large" click="(event){ paginate(beginIndex)  }">Back</Button>
                        <Button class="button large" click="(event){ event.preventDefault(); goBack();  }">Back</Button>
                 </div>
                 <Footer>Made by Tarados Feroces</Footer>`;
}
}

const beginIndex = 10;

const paginate = (index) => {
    // httpModule.doRequest('POST', '/')
};