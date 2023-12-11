class ProjectVideosController < ApplicationController
  before_action :set_project_video, only: %i[ show update destroy ]

  # GET /project_videos
  def index
    @project_videos = ProjectVideosService.listAll

    render json: @project_videos
  end

  # GET /project_videos/1
  def show
    render json: @project_video
  end

  # POST /project_videos
  def create
    @project_video = ProjectVideosService.save(project_video_params)

    if @project_video.save
      render json: @project_video, status: :created, location: @project_video
    else
      render json: @project_video.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /project_videos/1
  def update
    @project_video = ProjectVideosService.get(params)
    updated_project_video = ProjectVideosService.update(@project_video, project_video_params)
    if @project_video.update(project_video_params)
      render json: @project_video
    else
      render json: @project_video.errors, status: :unprocessable_entity
    end
  end

  # DELETE /project_videos/1
  def destroy
    ProjectVideosService.delete(params)
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_project_video
      @project_video = ProjectVideosService.get(params)
    end

    # Only allow a list of trusted parameters through.
    def project_video_params
      params.permit(:project_id, :video_title, :video_url)
    end
end
