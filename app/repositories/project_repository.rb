class ProjectRepository
    # A function to list all projects
    def self.all
        Project.all
    end

    # A function to create a project
    def self.create(project_params)
        Project.create(project_params)
    end

    # A function to find a project by id
    def self.find_by_id(project_id)
        Project.find(project_id)
    end

    # A function to find a project using a specific attribute
    def self.find_by_attribute(attribute, value)
        Project.find_by(attribute => value)
    end

    # A function to find a project that satisfies a condition
    def self.where(conditions)
        Project.where(conditions)
    end

    # A function to update a project
    def self.update_attributes(project, project_params)
        project.update(project_params)
    end

    # A function to delete a project
    def self.delete_by_id(project_id)
        project = Project.find(project_id)
        project.destroy
    end
 
end