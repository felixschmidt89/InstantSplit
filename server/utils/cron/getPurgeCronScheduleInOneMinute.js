const getPurgeCronScheduleInOneMinute = () => {
  const now = new Date();
  const nextMinuteDate = new Date(now.getTime() + 60000);
  const minutes = nextMinuteDate.getMinutes();
  const hours = nextMinuteDate.getHours();

  return `${minutes} ${hours} * * *`;
};

export default getPurgeCronScheduleInOneMinute;
