import { combineReducers } from "redux";
import article from './ArticleReducer';
import auth from './AuthReducer';
import common from './CommonReducer';
import home from './HomeReducer';
import settings from './Settings';
import articleList from './ArticleListReducer';
import editor from './EditorReducer';

export default combineReducers({
    article,
    auth,
    common,
    home,
    settings,
    articleList,
    editor
});