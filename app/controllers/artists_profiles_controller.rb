class ArtistsProfilesController < ApplicationController
  before_action :set_artists_profile, only: %i[ show update destroy ]

  # GET /artists_profiles
  def index
    @artists_profiles = ArtistsProfile.all

    render json: @artists_profiles
  end

  # GET /artists_profiles/1
  def show
    render json: @artists_profile
  end

  # POST /artists_profiles
  def create
    @artists_profile = ArtistsProfile.new(artists_profile_params)

    if @artists_profile.save
      render json: @artists_profile, status: :created, location: @artists_profile
    else
      render json: @artists_profile.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /artists_profiles/1
  def update
    if @artists_profile.update(artists_profile_params)
      render json: @artists_profile
    else
      render json: @artists_profile.errors, status: :unprocessable_entity
    end
  end

  # DELETE /artists_profiles/1
  def destroy
    @artists_profile.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_artists_profile
      @artists_profile = ArtistsProfile.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def artists_profile_params
      params.require(:artists_profile).permit(:artist_id, :artist_image, :image_public_id, :bio)
    end
end
