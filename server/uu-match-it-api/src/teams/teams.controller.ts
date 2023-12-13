import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Req,
    UseGuards,
} from '@nestjs/common';
import {Team} from "../Interfaces/Team";
import { AuthGuard } from '../auth/auth.guard';
import { AuthRequest } from '../Interfaces/AuthRequest';
import { TeamsService } from './teams.service';
import { UsersService } from '../users/users.service';

@Controller('teams')
export class TeamsController {


    constructor(private worker: TeamsService, private userService: UsersService) {
        this.worker = worker;
        this.userService = userService;
    }

    /**
     * Allows user to create a team
     * @param request
     * @param team Team object to be created
     *
     * TODO add validation of the object
     * */
    @UseGuards(AuthGuard)
    @Post()
    createTeam(@Req() request: AuthRequest, @Body() team: Team) {
        console.log(team);


        if (team.name.length < 3) {
            throw new BadRequestException("Team name is too short");
        }

        if (team.name.length > 30) {
            throw new BadRequestException("Team name is too long");
        }

        this.worker.createTeam(request.user.id, team.name);
        return "Team created";
    }

    //FIXME: This is a temporary solution to get the teams of the user
    //FIXME: Delete this when testing is finished
    @UseGuards(AuthGuard)
    @Get()
    getTeams() {
        return this.worker.getTeams();
    }


    /**
     * Invite a user to a team
     * @param request
     * @param teamId id of the team
     * @param userId id of the user to be invited
     * TODO add a person that is inviting
     * */
    @UseGuards(AuthGuard)
    @Post("invite/:teamId/:userId")
    inviteToTeam(@Req() request: AuthRequest, @Param("teamId") teamId: string, @Param("userId") userId: string) {
        const teamOwner = this.worker.getTeam(teamId);
        if (teamOwner.ownerId !== parseInt(request.user.id)) {
            throw new BadRequestException("You are not the owner of the team");
        }

        if (userId === request.user.id) {
            throw new BadRequestException("You cannot invite yourself");
        }

        this.userService.inviteUserToTeam(teamId, userId)
        return "User invited";
    }


    /**
     * TeamOwner can edit the parameters of the team like image or name
     * @param teamId id of the team
     * TODO figure out other parameters
     * */
    @UseGuards(AuthGuard)
    @Put()
    editTeam(teamId: string) {
        throw new Error("Method not implemented.");
    }


    /**
     * Deletes the team
     * @param teamId id of the team
     *
     * TODO add a person that is removing for permission check
     * */
    @UseGuards(AuthGuard)
    @Delete()
    deleteTeam(teamId: string) {
        throw new Error("Method not implemented.");
    }

    /**
     * Removes a user from the team
     * @param teamId id of the team
     * @param userId id of the user to be removed
     *
     * TODO add a person that is removing for permission check
     * */
    @UseGuards(AuthGuard)
    @Delete()
    kickFromTeam(teamId: string, userId: string) {
        throw new Error("Method not implemented.");
    }

    /**
     * Allows user to leave the team
     * @param teamId id of the team
     * */
    @UseGuards(AuthGuard)
    @Delete()
    leaveTeam(teamId: string) {
        throw new Error("Method not implemented.");
    }
}
