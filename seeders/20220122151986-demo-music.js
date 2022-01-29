"use strict"

module.exports = {
  up: async (queryInterface, Sequelize) =>
    await queryInterface.bulkInsert(
      "music",
      [
        {
          title: "Circles",
          year: "2019",
          thumbnail: "Rectangles-4.png",
          attache: "1.mp3",
          artisId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Logic",
          year: "2019",
          thumbnail: "Rectangles-4-1.png",
          attache: "2.mp3",
          artisId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Godzilla",
          year: "2020",
          thumbnail: "Rectangles-4-2.png",
          attache: "3.mp3",
          artisId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Never Ever (feat. Eminem & Drake)",
          year: "2019",
          thumbnail: "Rectangles-4-3.png",
          attache: "4.mp3",
          artisId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Love U Better ft. Lil Wayne & The-Dream",
          year: "2018",
          thumbnail: "Rectangles-4-4.png",
          attache: "5.mp3",
          artisId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Tragic",
          year: "2019",
          thumbnail: "Rectangles-4-5.png",
          attache: "6.mp3",
          artisId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Midsummer",
          year: "2019",
          thumbnail: "Rectangles-4-6.png",
          attache: "7.mp3",
          artisId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Slow Dancing In The Dark",
          year: "2018",
          thumbnail: "Rectangles-4-7.png",
          attache: "8.mp3",
          artisId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "History",
          year: "2018",
          thumbnail: "Rectangles-4-8.png",
          attache: "9.mp3",
          artisId: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "I LIKE U",
          year: "2017",
          thumbnail: "Rectangles-4-9.png",
          attache: "10.mp3",
          artisId: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Love Galore",
          year: "2017",
          thumbnail: "Rectangles-4-10.png",
          attache: "11.mp3",
          artisId: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "End Of The Road",
          year: "1991",
          thumbnail: "Rectangles-4-11.png",
          attache: "12.mp3",
          artisId: 11,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("music", null, {})
  },
}
