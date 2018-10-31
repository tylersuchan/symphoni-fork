from spotipy import oauth2, util, Spotify
from configparser import ConfigParser
from flask import Blueprint, redirect, request, url_for
import persistence

config = ConfigParser()
config.read('config.ini')
spotify_settings = config['spotify_settings']

sp_oauth = oauth2.SpotifyOAuth(spotify_settings['spotifyClientId'], spotify_settings['spotifyClientSecret'],
                               spotify_settings['spotifyRedirectURI'], scope=spotify_settings['spotifyScope'])

spotify_auth = Blueprint('spotify_auth', __name__)


@spotify_auth.route('/callback')
def index():
    auth_code = sp_oauth.parse_response_code(request.url)
    token_info = sp_oauth.get_access_token(auth_code)
    access_token = token_info['access_token']
    refresh_token = token_info['refresh_token']
    return redirect(config['general']['symphoniURI'] + '?access_token=' + access_token + '&refresh_token=' + refresh_token)
