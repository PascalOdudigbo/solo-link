class ProjectVideosRepository
    # A function to list all projectvideos
    def self.all
        ProjectVideo.all
    end
     
    # A function to create a project video
    def self.create(project_video_params)
        ProjectVideo.create(project_video_params)
    end

    # A function to find a project video by id
    def self.find_by_id(project_video_id)
        ProjectVideo.find(project_video_id)
    end

    # A function to find a project video using a specific attribute
    def self.find_by_attribute(attribute, value)
        ProjectVideo.find_by(attribute => value)
    end

    # A function to find a project video that satisfies a condition
    def self.where(conditions)
        ProjectVideo.where(conditions)
    end

    # A function to update a project video
    def self.update_attributes(project_video, project_video_params)
        project.update(project_video_params)
    end

    # A function to delete a project video
    def self.delete_by_id(project_video_id)
        project = ProjectVideo.find(project_video_id)
        project.destroy
    end
 
end