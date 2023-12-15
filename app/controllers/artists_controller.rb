class ArtistsController < ApplicationController
  before_action :set_artist, only: %i[ show update destroy ]

  # GET /artists
  def index
    @artists = ArtistService.listAll

    render json: @artists
  end

  # GET /artists/1
  def show
    render json: @artist, include: ['artists_profile', 'artists_social', ['projects', 'projects.project_videos']]
  end

  # POST /artists
  def create
    artist = ArtistService.save(artist_params)

    if ArtistRepository.where(id: user.id).length == 1
      render json: artist, status: :created, location: artist
    else
      render json: artist.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /artists/1
  def update
    # Getting target artist
    @artist = ArtistService.get(params)
    # Updating target artist
    updated_artist = ArtistService.update(@artist, artist_params)
    # verifying update success
    if @artist.update(artist_params)
      render json: @artist
    else
      render json: @artist.errors, status: :unprocessable_entity
    end
  end

  # DELETE /artists/1
  def destroy
    ArtistService.delete(params)
  end

  #POST /artists_login
  def artist_login
    artist = ArtistService.login(params, session)
    if artist.class != Hash
      render json: artist, status: :created
    else
      render json: artist, status: :unauthorized
    end
  end

   # DELETE /artists_logout
   def artist_logout
    ArtistService.logout(session)
    head :no_content
  end

  # GET /artists_logged_in
  def check_artist_logged_in
    render json:  ArtistService.logged_in(session), include: ['artists_profile', 'artists_social', ['projects', 'projects.project_videos']]
  end

  #POST /artists_recover_account
  def recover_account
    artist = ArtistService.accountRecovery(params)
    if artist.class != Hash
      render json: artist, status: :accepted
    else
      render json: artist, status: :unauthorized
    end
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_artist
      @artist = ArtistService.get(params)
    end

    # Only allow a list of trusted parameters through.
    def artist_params
      params.require.permit(:first_name, :last_name, :stage_name, :email, :verified, :password, :password_confirmation)
    end
end
