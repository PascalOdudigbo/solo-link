class ArtistsProfilesController < ApplicationController
  before_action :set_artists_profile, only: %i[ show update destroy ]

  # GET /artists_profiles
  def index
    @artists_profiles = ArtistsProfileService.listAll

    render json: @artists_profiles
  end

  # GET /artists_profiles/1
  def show
    render json: @artists_profile
  end

  # POST /artists_profiles
  def create
    artists_profile = ArtistsProfileService.save(artists_profile_params)

    if ArtistsProfileRepository.where(id: artists_profile.id).length == 1
      render json: artists_profile, status: :created, location: artists_profile
    else
      render json: artists_profile.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /artists_profiles/1
  def update
    # getting the target profile
    @artists_profile = ArtistsProfileService.get(params)
    # updating the target profile
    updated_artists_profile = ArtistsProfileService.update(@artists_profile, artists_profile_params)
    # verifying update success
    if @artists_profile.update(artists_profile_params)
      # returning updated details as JSON
      render json: @artists_profile
    else
      # returning error message as json
      render json: @artists_profile.errors, status: :unprocessable_entity
    end
  end

  # DELETE /artists_profiles/1
  def destroy
    ArtistsProfileService.delete(params)
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_artists_profile
      @artists_profile = ArtistsProfileService.get(params)
    end

    # Only allow a list of trusted parameters through.
    def artists_profile_params
      params.permit(:artist_id, :artist_image, :image_public_id, :bio)
    end
end
