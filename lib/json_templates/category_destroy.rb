module CategoryDestroy
  class CategoryDestroy
    def success
      @success_template = {
        status: {
          code: 200,
          message: "Success"
        },
        message: "Category Destroyed"
      }

      return @success_template
    end
  end
end