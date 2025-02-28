const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);

        res.render('entries/index.ejs', {
            entries: currentUser.entry,
        });

    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})

router.get('/new', async (req, res) => {
    res.render('entries/new.ejs');
});

router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.entry.push(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/entries`);
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
});

router.get('/:entryId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);

        const entry = currentUser.entry.id(req.params.entryId)

        res.render('entries/show.ejs', {
            entry: entry
        });

    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});


router.delete('/:entryId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.entry.id(req.params.entryId).deleteOne();
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/entries`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});


router.get('/:entryId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const entry = currentUser.entry.id(req.params.entryId);
        res.render('entries/edit.ejs', {
            entry: entry,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.put('/:entryId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const entry = currentUser.entry.id(req.params.entryId);
      entry.set(req.body);
      await currentUser.save();
      res.redirect(
        `/users/${currentUser._id}/entries/${req.params.entryId}`
      );
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });

module.exports = router;