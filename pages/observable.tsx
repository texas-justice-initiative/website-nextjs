import Layout from '@/components/Layout';
import Primary from '@/components/Primary';
import cmsContent from '@/content/observable.md';

const {
  attributes: { plot },
} = cmsContent;

function ObservableDemo() {
  console.log(plot);

  return (
    <Layout>
      <Primary>
        <h1>Observable Demo</h1>
        <p>
          This is a simple demo of how we can insert data from ObservableHQ. The
          easiest way is to use an iframe to allow for easy embeds.
        </p>
        <div style={{ maxWidth: '800px' }}>
          <h2>An example embed</h2>
          <p>
            The plot below is a very basic example showing the Custodial Death
            Report dataset deaths for all years broken down by race.
          </p>
          <div dangerouslySetInnerHTML={{ __html: plot.code }} />
          <p>
            <strong>
              Below is the embed code for the plot above. You can use it to
              confirm your new code is added.
            </strong>
          </p>
          {plot.code}
          <br />
          <br />
          <h2>Adding a Plot through Netlify</h2>
          <p>
            Netlify allows us to easily add new plots by providing our own embed
            code. First navigate to{' '}
            <a href="https://observablehq.com">Observable HQ</a> to make your
            plot. Once you have it ready, you need to do a few things to prepare
            it for the website:
            <ol>
              <li>
                <strong>Name the cell containing the plot.</strong> This can be
                done by clicking on the plot you want to export. Once selected,
                you should see a toolbar at the very bottom of the page. On the
                far left side of that you can add a name for the plot.
              </li>
              <li>
                <strong>Create embed code.</strong> Once you have named the
                plot, you can click the 3 vertical dots to the left of your plot
                to open an options menu. Inside that menu is an option to
                "Embed". Click that and folow the steps to create your embed
                code.
              </li>
              <li>
                <strong>Add code to Netlify.</strong> Now that our code is
                ready, copy it and{' '}
                <a href="https://texasjusticeinitiative.org/static/admin/index.html">
                  head over to Netlify.
                </a>{' '}
                Once you are logged in, navigate to the "Observable" page and
                drop in your code. Go ahead and save and then publish.
              </li>
              <li>
                It will take a few minutes to deploy once published, but once it
                is ready you can refresh this page to see your new plot!
              </li>
            </ol>
          </p>
        </div>
      </Primary>
    </Layout>
  );
}

export default ObservableDemo;
