class GamesController < ApplicationController
  def index
    # for now, just giving the first user
    currentUser = User.first
    currentGame = currentUser.game
    currentRound = currentUser.game.rounds.last
    countRounds = currentUser.game.rounds.count
    # current_user = current_user.game_id
    render component: 'Game', props: { currentUser: currentUser, currentGame: currentGame, currentRound: currentRound, countRounds: countRounds }

  end

  def new
  end

  def create
    game = Game.create

    round = Round.create(game_id: game.id)
    # Creator is created here instead of in user controller.

    user = User.new(name: params[:name], creator: params[:creator], game_id: game.id)
    if user.save!
      session[:user_id] = user.id
      redirect_to '/games/new'
    end
  end

  private

end
