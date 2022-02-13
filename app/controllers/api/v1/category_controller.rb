require './lib/json_templates/category_create.rb'
require './lib/json_templates/category_new.rb'

module Api
  module V1
    class CategoryController < ApplicationController

      def create
        # @id
        @body = JSON.parse(request.raw_post)
        @create = CategoryCreate.new

        if @body["project_id"]

          @project = Project.find_by(
            id: @body["project_id"],
            user_id: @id
          )

          @category = @project.categories.create(
            title: @body["title"]
          )

          if @category.save
            render json: @create.success
          else
            @create.errors = @category.errors

            render json: @create.fail, status: :bad_request
          end

        else
          @create.errors = {
            project_id: ["is empty"]
          }

          render json: @create.fail, status: :bad_request
        end

      end

      def new
        @project_id = params["project_id"]
        @new = CategoryNew.new

        @categories = Category.where(project_id: @project_id)

        @new.data = @categories

        render json: @new.success
      end

      private
      include CategoryCreate
      include CategoryNew



    end
  end
end