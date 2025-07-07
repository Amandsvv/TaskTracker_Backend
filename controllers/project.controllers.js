import Project from "../models/project.models.js"
import {ApiError} from "../utils/ApiError.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const createProject = asyncHandler(async (req,res) => {
    const {title,description} = req.body;
    const userId = req.user._id;

    if(!title || !description){
        throw new ApiError(400, "All fields are required");
    }

    if(!userId){
        throw new ApiError(400, "User unauthorized")
    }

    const projectCount = await Project.countDocuments({user : userId});

    if(projectCount >= 4){
        throw new ApiError(400, "Only 4 projects can be added.")
    }

    const project = await Project.create({
        title,
        description,
        user : userId
    });

    if(!project){
        throw new ApiError(400, "Project addition failed.")
    }

    return res.status(200).json(new ApiResponse(201,project,"Project created successfully"));
});

const getUserProjects = asyncHandler(async(req,res) => {
    const userId = req.user._id;

    if(!userId){
        throw new ApiError(400, "User not found");
    };

    const project = await Project.find({user:userId});
    console.log(project)

    return res.status(200).json(new ApiResponse(200,project,"Projects are here"));
});

const projectById = asyncHandler(async(req,res) => {
    const {id} = req.params;
    const userId = req.user._id;


    if(!id){
        throw new ApiError(400,"Project id missing");
    }

    const project = await Project.findOne({_id : id,user : userId});

    if(!project){
        throw new ApiError(400, "Project not found");
    }

    return res.status(200).json(new ApiResponse(200,project,"Project found"));
});

const deleteProject = asyncHandler(async(req,res) => {
    const {id} = req.params;
    const userId = req.user._id;

    if(!id){
        throw new ApiError(400, "Project id missing");
    }

    if(!userId){
        throw new ApiError(400, "User not found");
    }

    const project = await Project.findByIdAndDelete({_id : id, user : userId});

    if(!project){
        throw new ApiError(400, "Project deletion fialed");
    };

    return res.status(200).json(201,project,"Project deleted sucessfully");
});

export{
    createProject,
    getUserProjects,
    projectById,
    deleteProject
}
