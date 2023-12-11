class ArtistsSocialsController < ApplicationController
  before_action :set_artists_social, only: %i[ show update destroy ]

  # GET /artists_socials
  def index
    @artists_socials = ArtistsSocial.all

    render json: @artists_socials
  end

  # GET /artists_socials/1
  def show
    render json: @artists_social
  end

  # POST /artists_socials
  def create
    @artists_social = ArtistsSocial.new(artists_social_params)

    if @artists_social.save
      render json: @artists_social, status: :created, location: @artists_social
    else
      render json: @artists_social.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /artists_socials/1
  def update
    if @artists_social.update(artists_social_params)
      render json: @artists_social
    else
      render json: @artists_social.errors, status: :unprocessable_entity
    end
  end

  # DELETE /artists_socials/1
  def destroy
    @artists_social.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_artists_social
      @artists_social = ArtistsSocial.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def artists_social_params
      params.require(:artists_social).permit(:artist_id, :instagram, :tiktok, :twitter, :facebook, :youtube)
    end
end
