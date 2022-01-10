const db = require("../models");
const Invitation = db.invitation;

checkInvitationExist = async (req, res, next) => {
    try {
        const invitation = await Invitation.findOne(
            {
                where: {
                    email: req.body.email
                }
            }
        )
        if (req.body.invitation === 'reject') {
            await invitation.update({
                status: 'rejected'
            })
            return res.send({ message: 'Invitation is rejected by company.' });
        }
        else if (!invitation) {
            res.status(400).send({
                message: "please check the email, user is not invited by company!!!"
            });
            return;
        }
        next();
    }
    catch (err) {
        res.send({ message: err.message });
    }

}
const invitation = {
    checkInvitationExist: checkInvitationExist
};


module.exports = invitation;