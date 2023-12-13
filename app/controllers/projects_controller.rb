class ProjectsController < ApplicationController
  before_action :set_project, only: %i[ show update destroy ]

  # GET /projects
  def index
    @projects = ProjectService.listAll

    # Order the projects by time created
    render json: @projects.order(created_at: :desc)
  end

  # GET /projects/1
  def show
    render json: @project
  end

  # POST /projects
  def create
    @project = ProjectService.save(project_params)

    if @project.save
      render json: @project, status: :created, location: @project
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /projects/1
  def update
    @project = ProjectService.get(params)
    updated_project = ProjectService.update(@project, project_params)
    if @project.update(project_params)
      render json: @project
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end

  # DELETE /projects/1
  def destroy
    ProjectService.delete(params)
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_project
      @project = ProjectService.get(params)
    end

    # Only allow a list of trusted parameters through.
    def project_params
      params.permit(:artist_id, :title, :project_url, :cover_art, :cover_art_public_id)
    end
end
