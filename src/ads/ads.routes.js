import { Router } from 'express';

import { accountType } from '../account/account.constants';
import adsController from './ads.controller';
import { auth } from '../account/account.middleware';

const router = new Router();

router
    .get('', [auth(accountType.student)], adsController.getUniversityPartnersAds)
    .get('/mine', [auth(accountType.partner)], adsController.getMyAds)
    .post('', [auth(accountType.partner)], adsController.createNewAd)
    .put('/:adId', [auth(accountType.partner)], adsController.editExistingAd)

export default router;