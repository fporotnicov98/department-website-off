import React from 'react';
import './normalize.scss'
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import NewsContainer from './component/News/NewsContainer';
import SurveyContainer from './component/Survey/SurveyContainer';
import ForumContainer from './component/Forum/ForumContainer';
import Information from './component/Imformation/Information';
import ForumItemContainer from './component/Forum/ForumItem/ForumItemContainer';
import PersonalAccountContainer from './component/Personal/PersonalAccountContainer';

const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div>
          <Switch>
              <Route exact path='/' render={() => <NewsContainer />} />
              <Route path='/survey' render={() => <SurveyContainer />} />
              <Route exact path='/forums' render={() => <ForumContainer />} />
              <Route path='/forum/:forumId?' render={() => <ForumItemContainer />} />
              <Route path='/info' render={() => <Information />} />
              <Route path='/personal' render={() => <PersonalAccountContainer />} />
          </Switch>
        </div>

    </BrowserRouter>
  )
}

export default App;
