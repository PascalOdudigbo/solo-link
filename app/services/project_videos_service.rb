class ProjectVideosService
    # A function to list all project videos
    def self.listAll
        ProjectVideosRepository.all
    end
    # A function to create a project video
    def self.save(project_video_params)
        ProjectVideosRepository.create(project_video_params)
    end 
    # A function to find a project video by id
    def self.get(project_video_params)
        ProjectVideosRepository.find_by_id(project_video_params[:id])
    end
    # A function to update a project video
    def self.update(project_video, project_video_params)
        ProjectVideosRepository.update_attributes(project, project_video_params)
    end
    # A function to delete a project video
    def self.delete(project_video_params)
        ProjectVideosRepository.delete_by_id(project_video_params[:id])
    end  
end