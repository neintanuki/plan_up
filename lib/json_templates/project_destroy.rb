module ProjectDestroy
  class ProjectDestroy
    def success
      @success_template = {
        status: {
          code: 200,
          message: "Success"
        },
        message: "Project Destroyed"
      }

      return @success_template
    end
  end
end