class ProjectService
    # A function to list all projects
    def self.listAll
        ProjectRepository.all
    end
    # A function to create a project
    def self.save(project_params)
        ProjectRepository.create(project_params)
    end 
    # A function to find a project by id
    def self.get(project_params)
        ProjectRepository.find_by_id(project_params[:id])
    end
    # A function to update a project
    def self.update(project, project_params)
        ProjectRepository.update_attributes(project, project_params)
    end
    # A function to delete a project
    def self.delete(project_params)
        ProjectRepository.delete_by_id(project_params[:id])
    end  
end