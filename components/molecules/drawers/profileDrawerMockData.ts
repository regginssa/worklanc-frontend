import { PorfolioCardItem } from "@/components/common/PorfolioCard";
import { TalentProfileJobCardGroupItem } from "../TalentProfileJobCardGroup";
import { WorkHistoryWorklancTab } from "../freelancer-profile";

export const profileDrawerWorkHistoryTabs: WorkHistoryWorklancTab[] = [
  { label: "Search related (10)", value: "search_related" },
  { label: "Completed (91)", value: "completed" },
  { label: "In progress (2)", value: "in_progress" },
];

export const profileDrawerJobHistory: TalentProfileJobCardGroupItem[] = [
  {
    title: "Looking for a pro android developer",
    description:
      "I'm looking for a pro android developer to help me build my app. I need someone who is experienced in android development and has a good understanding of the android platform.",
    skills: ["Android", "React Native", "Expo"],
    startDate: new Date(),
    endDate: new Date(),
    totalAmount: 1000,
    hourlyRate: 100,
    duration: 10,
    type: "hourly",
    status: "completed",
    review: 4.8,
  },
  {
    title: "Looking for a pro ios developer",
    description:
      "I'm looking for a pro ios developer to help me build my app. I need someone who is experienced in ios development and has a good understanding of the ios platform.",
    skills: ["iOS", "Swift", "Objective-C"],
    startDate: new Date(),
    endDate: new Date(),
    totalAmount: 1000,
    type: "fixed",
    status: "completed",
    review: 4.8,
  },
  {
    title: "Looking for a pro android developer",
    description:
      "I'm looking for a pro android developer to help me build my app. I need someone who is experienced in android development and has a good understanding of the android platform.",
    skills: ["Android", "React Native", "Expo"],
    startDate: new Date(),
    endDate: new Date(),
    totalAmount: 1000,
    type: "fixed",
    status: "in_progress",
  },
  {
    title: "Looking for a pro android developer",
    description:
      "I'm looking for a pro android developer to help me build my app. I need someone who is experienced in android development and has a good understanding of the android platform.",
    skills: ["Android", "React Native", "Expo"],
    startDate: new Date(),
    isCurrent: true,
    type: "hourly",
    status: "in_progress",
    review: 4.8,
    hourlyRate: 100,
    totalAmount: 1000,
    duration: 345,
  },
];

export const profileDrawerWorkHistorySummary =
  "A top-performing mobile application developer specializing in both iOS and Android platforms. Has developed over 50 applications including a subscription-based food delivery system [1] and a fintech app utilizing serverless architecture [2]. Notable for end-to-end solutions such as loyalty programs for retail [3]and high-quality app development for dynamic user interfaces across various se… Show more";

export const profileDrawerSkills = [
  "Android",
  "React Native",
  "Expo",
  "iOS",
  "Swift",
  "Flutter",
];

export const profileDrawerPortfolioItems: PorfolioCardItem[] = [
  {
    title: "Swisscheese - Multi-chain Tokenized Stocks & ETFs",
    img: "https://upwork-usw2-prod-agora-file-storage.s3.us-west-2.amazonaws.com/profile/portfolio/thumbnail/d18be1d84a0a5776866e3e1f9a6a65c7?response-content-disposition=inline%3B%20filename%3D%22image_large%22%3B%20filename%2A%3Dutf-8%27%27image_large&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD7YomIcwKePuezo0AcPp91yQs8uCHoi9gFWDk0%2BKAd7QIgaGh7SVO3LkEdJENaASP%2BSXkOvD71rgRH3RWtbWcVyxUqkgUIcBAAGgw3Mzk5MzkxNzM4MTkiDHMxNOFePj%2BYn7NulirvBM1YG8ym58LfF%2BID8e%2BevJvxFWSV1NLVmxrn%2FPTTQV7w%2BG2l1isNSnSSYiRTibvF9NSr0hmixA3LqpC4nw52YU3O6%2FVvI10OVGcXfE2BLk5mAVvzplVN1xaCjmr0Oa1Sx73g7TJSfN%2FNAqWbG2mHNkwo8f05wcC8y6iimV6V1fAXkX4r1GrtoRvBqAqgwBo8uJHCadExBtor2TyjZ9l2PDOFOT1%2FFiUq2esfRKoJDEFaZiYs5gyHGYjjiyB4%2BVvff2MF76V4WymD5V7ATiCFbW0prge5AQgLe1v3co%2BKSoqOLKbDx4I3ZcUu9W0B9f6ca6jYf%2F%2F9GP%2BiOP5R6OjRz%2BhSm%2BS5lPJrNp15vaUc%2FESuFS13RXx3sGhH4vMYPF4tuaBooAJNqZmfMDG94C5tNdSN2LNVMhVBm5sApF65EwESPH%2F%2BySVxm14cOePddWN%2FWf3aiaxQLfm%2BBs%2BR%2FC3vAOahdrindXlOgvUMweB3t%2FQWlsQJQcqavj%2B7xJwfZQf5trUF%2BEk4FmBOISFKrNVuUg4C%2Fm1fITci%2B1yAtQcwDNTVz5ojzbyL2%2B%2FF6f4Z9bUp7q1nJUGfHMKhdlJsDPQNt2X19hehWr42ErzqFe1SBv9g8NBkXAjP09bR7kMGAfEKZjG7rO9aU6eToKFWWeqM8x%2BslTpuO50E17dUi%2FOlew0uI7tIF0ciwKk8cP9ePzi0sFr7imJAg0eaNfxF4%2F%2FEXeWryVrJtv8rCmzr9SwRg9%2FuDjg30ffnjHinp1oFFS32Pqa64B%2FYpiMiXl6P0eYKW3InPQvEHQ3Lquf2qz%2BT4H%2BYMQFEI0Uc7VcrSqFEabEdMLS8i9EGOpkBQFoQHaFtEf3CrNCVEq2KqaOVJYuf2w5ihOqYwvHo7UXlGKLDvMvULikA7Xwd90Y7dyMKZUik2JM2z1lvBSCPsULtuVWKkXGE6sAu%2FpYShCY7C9Syct%2FY7zbn2S%2BwbDorpsuEqH%2F%2FBKHFQTmZg85Vu0DMWqI%2F4YwJMRXJnvCyCRHAXT41%2FMqc3DlkpM8JG6mm%2FzgbW9f98MiW&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20260605T144453Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1799&X-Amz-Credential=ASIA2YR6PYW5WV4OHJE6%2F20260605%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=50749771db787d89b9e8b85115fa3bbf79563c74c5508be6f88cc367184fb0a5",
    skills: ["Android", "React Native", "Expo"],
  },
  {
    title: "Reflection - Multi-chain Tokenized Stocks & ETFs",
    img: "https://upwork-usw2-prod-agora-file-storage.s3.us-west-2.amazonaws.com/profile/portfolio/thumbnail/7b242e436f119ebef78a5aed596f5875?response-content-disposition=inline%3B%20filename%3D%22image_large%22%3B%20filename%2A%3Dutf-8%27%27image_large&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDrOm2irFTNMt%2BeJ7Hg%2BEZ0HQQ2loGLBZeFDWFZ6lc%2FSQIgFznJeGO3eKJHpKOo4Q4KmASmnrIvQzWw6C6tTB7KqxcqkgUIcBAAGgw3Mzk5MzkxNzM4MTkiDCOWwpB28vNLAxaNTyrvBJ%2F53nL3QEYEFEFP7VfUvHJbXNrace0w%2FUXaMITq4vWD6A7XAFbj%2BQBe1QlazHyJYt%2Fo%2Bl%2Bv%2F4Gb6LEu1FrQbCBn%2BDvNaJYYMyAoaPRLU2JaCdmMvI4%2BBycrooNTRLaO0B9%2BikM7IACVZuthulx%2BVqtbgprbgQKg6vxercC74qL5gxjeGrnYcBQOJM%2BO0vFAjVUnp%2BQ3LkuEKqyPaG8R3b22tzqmC3wuc3ddVgytuEGVgFyXK1Ghnkn43soW5%2FVEW6GEzmHSOrd6fV8RyemR711Q%2Bhm4cBOq8u35h5EDcFPNYD2ZUmKK%2FJs9rCaYi6%2FB0hVXPS2s0XhjaWkJAsbKH2lxjy2oUYJ6CT9ZZJvFPQayfh0k2kln5a1%2Ff%2FdulfYrNHqPnIFLpYPtqgnmuairn4%2Bin2Rye1zojVHWWYqgxXdLZtLXXaaVwnXqdii7aOIyBSmAN2Gcij280g3DYxjLFZURKKEKEK%2B95V3ai1fPifWorXdtq%2FW5bz7Yh0sLxGEWBS64mcdE5DAW7lo2OvPYv1NbkRgJJZPR3pQW%2FMjVzGzoW0FBauATaVYVrZ1LQaTzBLg1PSWyHfhzwdhM6nsuyeqbhfFKHat9Phulemgj6hJLntdusUWF7%2FkeZqZIarjKO2uDnUspnWaQ4KpjhMTfDD4Fx2gxfoZHlwURXtECAmY0Qo4Po81RFRSHxZ6z504y4mIXnXYX3wcpROUw%2BXYBUFolny2B1luVK2PnaWMJdbVRwKDuUN69AYQ7lCXid5bFQAOvPGFU4TXTSBVYshTDKO%2BgusvhPtjmz8EAyVdagCiIZn6DrTQud0Ecq%2B%2FrMGqvMNi4i9EGOpkBIatcbrTwG8jhmrIESd5pp1nltyrUrVhDWaJApmSGAHbv9DxOr4W2tbOh7Q2tfHrryPzD2rH7MsTAOL%2B2AYvlgOM7FpkJARptV41gxBeu7H1dDkWd%2BIo2z%2FgSgzCqtPA9XYt0X0EaBTogwwb3vT6NzDBRSiuUfdvzjL1aSygGdy5na9kCyzxwSuzGC%2BGHfdNFwwmsHWqEHEu6&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20260605T145242Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1799&X-Amz-Credential=ASIA2YR6PYW52DX4R5UG%2F20260605%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=a019ac9f8bc938a9ae07a239615912bca7d81875e6aa2548352fe7a82abc7f01",
    skills: ["Android", "React Native", "Expo"],
  },
  {
    title: "Bitcoin Bite",
    img: "https://upwork-usw2-prod-agora-file-storage.s3.us-west-2.amazonaws.com/profile/portfolio/thumbnail/4cb927a50a789ce54ee4d8ad690a9d1b?response-content-disposition=inline%3B%20filename%3D%22image_large%22%3B%20filename%2A%3Dutf-8%27%27image_large&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDVeCqOzWTyrQO0wno6olbDlVFfmj0HoegKdR3qdYaBEgIhAPt3aZMu6g7MaVzk9XMhcjHkpH7Tek42YESUOVu2hSWEKpIFCG8QABoMNzM5OTM5MTczODE5Igxkg6CViOgjYRpVl08q7wSvpW9e%2Btj32SdznAH80cHvuRBOdcF6N3MH99PnUVRClRlml1RDXY%2F1XzXLZ5yjFRZMqouyddn%2F66sBhcz7vdRmF56EqiZ%2FSTulsfCKsMgTSBSMCbzqudSc8zCsGemtHuLI3GB7DjRHvB%2FgE1sf1E0e8HGGuX0hVRC3zi%2Bog6VktoUCSr%2FOFNJqDJWLWokppcYNZblkRcjSbwm7Tq1mkPtSP24yjxZ2ha2Z6I2uhDqkED1P0ubNM8ulp53wPiBpJn19RlMEAPYoytH91v7apuWlj8eXIKSamq2aMuyelx1ESmnIR33FPKxgd0Incm6XUYPGFKz6VwCzUf739KKHDvD8oQDN2fA7v1Jdt8NWcaMNUXkluYycbiAtNRYwI2w1kOzT20LsR25kKhZdmx2wI7sENuqJn1mpXOp8BXAAEVXlu2W8fd%2FWQf5g0rcuPTddroSJ6nSdBV3KOm9SxL5epSTnxsO63ETyebo8H80BBLPTesDDJfyGJ6Ffq5x%2BHRtpFhpXWTFqfVDe52fHtkX5ebG06g8r2xJq20JGSVPgz3gbxzPQ%2Fj0iI5Px3axnTcZTNpaFLbT2FAWsvyvfa4FPHrVXi%2FlaSliF5JivDf%2FBFwli4yNnzzijoCFzGmBJmxmufk7mt2YWJDyh97u7FLMWX8abqx6xJCJMSzCEwSr7ncP1WEN%2BWaIY7oRqt2GmfWa2GVRHEfqw96%2FXDTXWDQCZYNLQoOK5cAv2lmbsIx10fhRNCgxUVQuELUVH4FpDk17rZRco5fewcTH5PJnVNpMxYy0ITSOqGJhMMmIqXl%2FCjTKpdx5AAlef91RF16SlHOBQFzDrr4vRBjqYAdVWO4F%2BMVPIS7%2FSMfNRSFO4bUOOkOfa9t%2F0Vg66zeVCbcj7zDnNtkE5SAshzb35zen3UDgHXnsnXQSwxoG8wuk8ysLAuivulyMahFVDfGMoqmtJPZgbYkzZPuGsgOmpjzk3rKlk%2FdeLHD3WfbY9fnOh%2B6jjNpFNfrR8bUX8B255naoSoDnV3L9go2y8QibEsrbrziuQN4mG&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20260605T145550Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1799&X-Amz-Credential=ASIA2YR6PYW5W36FAYSP%2F20260605%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=8cc1f124a0c0858c728ccfb8679d8866aa44c716d546dfb30e08cef90e1bfe40",
    skills: ["Android", "React Native", "Expo"],
  },
];
