import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});

app.model({ namespace: 'approval', ...(require('/Users/ifun/my-projects/blog/src/models/approval.ts').default) });
app.model({ namespace: 'article', ...(require('/Users/ifun/my-projects/blog/src/models/article.ts').default) });
app.model({ namespace: 'category', ...(require('/Users/ifun/my-projects/blog/src/models/category.ts').default) });
app.model({ namespace: 'feedback', ...(require('/Users/ifun/my-projects/blog/src/models/feedback.ts').default) });
app.model({ namespace: 'global', ...(require('/Users/ifun/my-projects/blog/src/models/global.ts').default) });
app.model({ namespace: 'mc', ...(require('/Users/ifun/my-projects/blog/src/models/mc.ts').default) });
app.model({ namespace: 'messageSender', ...(require('/Users/ifun/my-projects/blog/src/models/messageSender.ts').default) });
app.model({ namespace: 'team', ...(require('/Users/ifun/my-projects/blog/src/models/team.ts').default) });
app.model({ namespace: 'user', ...(require('/Users/ifun/my-projects/blog/src/models/user.ts').default) });
